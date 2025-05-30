/**
 * 金利タイプの型定義
 * variable: 変動金利
 * fixed: 固定金利
 */
export type RateType = 'variable' | 'fixed'

/**
 * 金利カテゴリの型定義
 * store: 店頭金利
 * discount: 引き下げ幅
 * applied: 適用金利
 */
export type RateCategory = 'store' | 'discount' | 'applied'

/**
 * 個別の金利データを表すインターフェース
 * @property date - 日付（YYYY/MM形式）
 * @property store - 店頭金利値（%）
 * @property discount - 引き下げ幅（%）
 * @property applied - 適用金利値（%）
 */
export interface InterestRate {
  date: string
  store: number
  discount: number
  applied: number
}

/**
 * 変動/固定金利の全データを表すインターフェース
 * @property bankName - 銀行名
 * @property variable - 変動金利のデータ
 * @property fixed - 固定金利のデータ
 */
export interface InterestRateData {
  bankName: string
  variable: InterestRate[]
  fixed: InterestRate[]
}

/**
 * 金利タイプのリスト
 * 変動金利と固定金利を定義
 */
export const RATE_TYPES: RateType[] = ['variable', 'fixed']

/**
 * 金利カテゴリのリスト
 * 店頭金利、引き下げ幅、適用金利を定義
 */
export const RATE_CATEGORIES: RateCategory[] = ['store', 'discount', 'applied']

/**
 * 政策金利の推移データ
 * 日本銀行の無担保コール翌日物金利の推移（半年ごと）
 */
export const POLICY_RATE_DATA = [
  { date: '1994/06', rate: 2.0 },
  { date: '1994/12', rate: 2.0 },
  { date: '1995/06', rate: 0.5 },
  { date: '1995/12', rate: 0.5 },
  { date: '1996/06', rate: 0.5 },
  { date: '1996/12', rate: 0.5 },
  { date: '1997/06', rate: 0.5 },
  { date: '1997/12', rate: 0.5 },
  { date: '1998/06', rate: 0.25 },
  { date: '1998/12', rate: 0.25 },
  { date: '1999/06', rate: 0.0 },
  { date: '1999/12', rate: 0.0 },
  { date: '2000/06', rate: 0.25 },
  { date: '2000/12', rate: 0.25 },
  { date: '2001/06', rate: 0.0 },
  { date: '2001/12', rate: 0.0 },
  { date: '2002/06', rate: 0.0 },
  { date: '2002/12', rate: 0.0 },
  { date: '2003/06', rate: 0.0 },
  { date: '2003/12', rate: 0.0 },
  { date: '2004/06', rate: 0.0 },
  { date: '2004/12', rate: 0.0 },
  { date: '2005/06', rate: 0.0 },
  { date: '2005/12', rate: 0.0 },
  { date: '2006/06', rate: 0.25 },
  { date: '2006/12', rate: 0.5 },
  { date: '2007/06', rate: 0.75 },
  { date: '2007/12', rate: 0.75 },
  { date: '2008/06', rate: 0.5 },
  { date: '2008/12', rate: 0.1 },
  { date: '2009/06', rate: 0.1 },
  { date: '2009/12', rate: 0.1 },
  { date: '2010/06', rate: 0.1 },
  { date: '2010/12', rate: 0.1 },
  { date: '2011/06', rate: 0.1 },
  { date: '2011/12', rate: 0.1 },
  { date: '2012/06', rate: 0.1 },
  { date: '2012/12', rate: 0.1 },
  { date: '2013/06', rate: 0.1 },
  { date: '2013/12', rate: 0.1 },
  { date: '2014/06', rate: 0.1 },
  { date: '2014/12', rate: 0.1 },
  { date: '2015/06', rate: 0.1 },
  { date: '2015/12', rate: 0.1 },
  { date: '2016/06', rate: -0.1 },
  { date: '2016/12', rate: -0.1 },
  { date: '2017/06', rate: -0.1 },
  { date: '2017/12', rate: -0.1 },
  { date: '2018/06', rate: -0.1 },
  { date: '2018/12', rate: -0.1 },
  { date: '2019/06', rate: -0.1 },
  { date: '2019/12', rate: -0.1 },
  { date: '2020/06', rate: -0.1 },
  { date: '2020/12', rate: -0.1 },
  { date: '2021/06', rate: -0.1 },
  { date: '2021/12', rate: -0.1 },
  { date: '2022/06', rate: -0.1 },
  { date: '2022/12', rate: -0.1 },
  { date: '2023/06', rate: -0.1 },
  { date: '2023/12', rate: -0.1 },
  { date: '2024/03', rate: 0.0 }
]

/**
 * 銀行の過去の金利推移情報
 */
export const INTEREST_RATE_DATA: InterestRateData[] = [
  {
    bankName: 'A銀行',
    variable: [
      { date: '1994/06', store: 4.0, discount: 0.5, applied: 3.5 },
      { date: '1994/12', store: 4.0, discount: 0.5, applied: 3.5 },
      { date: '1995/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1995/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1996/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1996/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1997/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1997/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1998/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '1998/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '1999/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '1999/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2000/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2000/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2001/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2001/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2002/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2002/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2003/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2003/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2004/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2004/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2005/06', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2005/12', store: 2.0, discount: 0.5, applied: 1.5 },
      { date: '2006/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2006/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2007/06', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '2007/12', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '2008/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2008/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2009/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2009/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2010/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2010/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2011/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2011/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2012/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2012/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2013/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2013/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2014/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2014/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2015/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2015/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2016/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2016/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2017/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2017/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2018/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2018/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2019/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2019/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2020/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2020/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2021/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2021/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2022/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2022/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2023/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2023/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2024/03', store: 2.6, discount: 0.5, applied: 2.1 }
    ],
    fixed: [
      { date: '1994/06', store: 4.5, discount: 0.5, applied: 4.0 },
      { date: '1994/12', store: 4.5, discount: 0.5, applied: 4.0 },
      { date: '1995/06', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1995/12', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1996/06', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1996/12', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1997/06', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1997/12', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '1998/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1998/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '1999/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '1999/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2000/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2000/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2001/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2001/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2002/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2002/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2003/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2003/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2004/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2004/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2005/06', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2005/12', store: 2.5, discount: 0.5, applied: 2.0 },
      { date: '2006/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2006/12', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '2007/06', store: 4.0, discount: 0.5, applied: 3.5 },
      { date: '2007/12', store: 4.0, discount: 0.5, applied: 3.5 },
      { date: '2008/06', store: 3.5, discount: 0.5, applied: 3.0 },
      { date: '2008/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2009/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2009/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2010/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2010/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2011/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2011/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2012/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2012/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2013/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2013/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2014/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2014/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2015/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2015/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2016/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2016/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2017/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2017/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2018/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2018/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2019/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2019/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2020/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2020/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2021/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2021/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2022/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2022/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2023/06', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2023/12', store: 3.0, discount: 0.5, applied: 2.5 },
      { date: '2024/03', store: 3.1, discount: 0.5, applied: 2.6 }
    ]
  },
  {
    bankName: 'B銀行',
    variable: [
      { date: '2023/10', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2023/11', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2023/12', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/01', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/02', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/03', store: 3.075, discount: 0.5, applied: 2.575 }
    ],
    fixed: [
      { date: '2023/10', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2023/11', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2023/12', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/01', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/02', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/03', store: 3.3, discount: 0.5, applied: 2.8 }
    ]
  },
  {
    bankName: 'C銀行',
    variable: [
      { date: '2023/10', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2023/11', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2023/12', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/01', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/02', store: 2.975, discount: 0.5, applied: 2.475 },
      { date: '2024/03', store: 3.075, discount: 0.5, applied: 2.575 }
    ],
    fixed: [
      { date: '2023/10', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2023/11', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2023/12', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/01', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/02', store: 3.2, discount: 0.5, applied: 2.7 },
      { date: '2024/03', store: 3.3, discount: 0.5, applied: 2.8 }
    ]
  },
  {
    bankName: 'D銀行',
    variable: [
      { date: '2023/10', store: 2.975, discount: 0.7, applied: 2.275 },
      { date: '2023/11', store: 2.975, discount: 0.7, applied: 2.275 },
      { date: '2023/12', store: 2.975, discount: 0.7, applied: 2.275 },
      { date: '2024/01', store: 2.975, discount: 0.7, applied: 2.275 },
      { date: '2024/02', store: 2.975, discount: 0.7, applied: 2.275 },
      { date: '2024/03', store: 3.075, discount: 0.7, applied: 2.375 }
    ],
    fixed: [
      { date: '2023/10', store: 3.2, discount: 0.7, applied: 2.5 },
      { date: '2023/11', store: 3.2, discount: 0.7, applied: 2.5 },
      { date: '2023/12', store: 3.2, discount: 0.7, applied: 2.5 },
      { date: '2024/01', store: 3.2, discount: 0.7, applied: 2.5 },
      { date: '2024/02', store: 3.2, discount: 0.7, applied: 2.5 },
      { date: '2024/03', store: 3.3, discount: 0.7, applied: 2.6 }
    ]
  },
  {
    bankName: 'E銀行',
    variable: [
      { date: '2023/10', store: 2.975, discount: 0.6, applied: 2.375 },
      { date: '2023/11', store: 2.975, discount: 0.6, applied: 2.375 },
      { date: '2023/12', store: 2.975, discount: 0.6, applied: 2.375 },
      { date: '2024/01', store: 2.975, discount: 0.6, applied: 2.375 },
      { date: '2024/02', store: 2.975, discount: 0.6, applied: 2.375 },
      { date: '2024/03', store: 3.075, discount: 0.6, applied: 2.475 }
    ],
    fixed: [
      { date: '2023/10', store: 3.2, discount: 0.6, applied: 2.6 },
      { date: '2023/11', store: 3.2, discount: 0.6, applied: 2.6 },
      { date: '2023/12', store: 3.2, discount: 0.6, applied: 2.6 },
      { date: '2024/01', store: 3.2, discount: 0.6, applied: 2.6 },
      { date: '2024/02', store: 3.2, discount: 0.6, applied: 2.6 },
      { date: '2024/03', store: 3.3, discount: 0.6, applied: 2.7 }
    ]
  },
  {
    bankName: 'F銀行',
    variable: [
      { date: '2023/10', store: 2.975, discount: 0.65, applied: 2.325 },
      { date: '2023/11', store: 2.975, discount: 0.65, applied: 2.325 },
      { date: '2023/12', store: 2.975, discount: 0.65, applied: 2.325 },
      { date: '2024/01', store: 2.975, discount: 0.65, applied: 2.325 },
      { date: '2024/02', store: 2.975, discount: 0.65, applied: 2.325 },
      { date: '2024/03', store: 3.075, discount: 0.65, applied: 2.425 }
    ],
    fixed: [
      { date: '2023/10', store: 3.2, discount: 0.65, applied: 2.55 },
      { date: '2023/11', store: 3.2, discount: 0.65, applied: 2.55 },
      { date: '2023/12', store: 3.2, discount: 0.65, applied: 2.55 },
      { date: '2024/01', store: 3.2, discount: 0.65, applied: 2.55 },
      { date: '2024/02', store: 3.2, discount: 0.65, applied: 2.55 },
      { date: '2024/03', store: 3.3, discount: 0.65, applied: 2.65 }
    ]
  }
]
