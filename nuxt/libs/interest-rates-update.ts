import * as cheerio from 'cheerio'
import chalk from 'chalk'
import { getDb } from './firebase'

// 定数定義
export const BANKS = {
  MUFG: {
    id: 'mufg',
    name: '三菱UFJ銀行',
    url: 'https://www.bk.mufg.jp/kariru/jutaku/yuuguu/index.html'
  }
} as const

export type BankId = keyof typeof BANKS

export const LOAN_TYPES = {
  VARIABLE: 'variable',
  FIXED_10: 'fixed_10',
  FIXED_20: 'fixed_20',
  FIXED_30: 'fixed_30',
  FIXED_35: 'fixed_35'
} as const

export type LoanType = keyof typeof LOAN_TYPES

// 借入タイプの表示名
export const LOAN_TYPE_NAMES: Record<LoanType, string> = {
  VARIABLE: '変動金利',
  FIXED_10: '固定金利（10年）',
  FIXED_20: '固定金利（20年）',
  FIXED_30: '固定金利（30年）',
  FIXED_35: '固定金利（35年）'
}

// 型定義
export interface RateInfo {
  bankId: BankId
  loanType: LoanType
  displayRate: number
  appliedRate: number
  discountRate: number
  lastUpdated: string
  name?: string  // オプショナルな名前フィールド
}

// 金利情報を保存する関数
export async function saveRateInfo(rateInfo: RateInfo, isDryRun: boolean = false): Promise<void> {
  try {
    if (!isDryRun) {
      // Firestoreに保存
      const docRef = getDb().collection('interestRates').doc()
      await docRef.set({
        ...rateInfo,
        createdAt: new Date()
      })
    }

    // コンソールに表示
    console.log(chalk.green('=== 金利情報 ==='))
    if (rateInfo.name) {
      console.log(chalk.yellow('名前:'), chalk.white(rateInfo.name))
    }
    console.log(chalk.yellow('銀行:'), chalk.white(BANKS[rateInfo.bankId].name))
    console.log(chalk.yellow('借入タイプ:'), chalk.white(LOAN_TYPE_NAMES[rateInfo.loanType]))
    console.log(chalk.yellow('店頭金利:'), chalk.white(`${rateInfo.displayRate}%`))
    console.log(chalk.yellow('適用金利:'), chalk.white(`${rateInfo.appliedRate}%`))
    console.log(chalk.yellow('引き下げ率:'), chalk.white(`${rateInfo.discountRate}%`))
    console.log(chalk.grey(`\n最終更新: ${rateInfo.lastUpdated}`))
    // console.log(chalk.grey(`保存ID: ${docRef.id}`))
  } catch (error) {
    console.error(chalk.red('保存中にエラーが発生しました:'), error)
    throw error
  }
}

// 三菱UFJの金利情報を取得する関数
export async function fetchMUFGRate(): Promise<void> {
  try {
    console.log(chalk.blue(`${BANKS.MUFG.name}の金利情報を取得中...`))

    const response = await fetch(BANKS.MUFG.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // 変動金利の情報を取得
    const rateTable = $('table').filter((_, el) => $(el).text().includes('変動金利'))
    console.log('テーブル内容:', rateTable.text())

    // 店頭金利と適用金利を取得
    const rateText = rateTable.text()
    const displayRateMatch = rateText.match(/店頭表示金利\s*年(\d+\.\d+)%/)
    const appliedRateMatch = rateText.match(/年(\d+\.\d+)%\s*～/)

    if (!displayRateMatch || !appliedRateMatch) {
      throw new Error('金利情報が見つかりませんでした')
    }

    const rateInfo: RateInfo = {
      bankId: 'MUFG',
      loanType: 'VARIABLE',
      displayRate: parseFloat(displayRateMatch[1]),
      appliedRate: parseFloat(appliedRateMatch[1]),
      discountRate: parseFloat((parseFloat(displayRateMatch[1]) - parseFloat(appliedRateMatch[1])).toFixed(2)),
      lastUpdated: new Date().toLocaleString('ja-JP')
    }

    // 金利情報を保存
    await saveRateInfo(rateInfo, true)

  } catch (error) {
    console.error(chalk.red('エラーが発生しました:'), error)
    process.exit(1)
  }
}
