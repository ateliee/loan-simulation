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
 * @property url - 住宅ローン情報ページのURL
 */
export interface InterestRateData {
  bankName: string
  variable: InterestRate[]
  fixed: InterestRate[]
  url: string
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
  { date: '2024/03', rate: 0.01 },
  { date: '2024/07', rate: 0.25 },
  { date: '2025/01', rate: 0.5 },
  { date: '2025/06', rate: 0.5 },
]

/**
 * 銀行の過去の金利推移情報
 */
export const INTEREST_RATE_DATA: InterestRateData[] = [
  {
    bankName: "三菱UFJ銀行",
    url: "https://www.bk.mufg.jp/kariru/jutaku/",
    variable: [
      // ※変動金利（短期プライム連動）。店頭表示金利は1995年以降2.375%～2.875%で推移:contentReference[oaicite:0]{index=0}。
      { date: "1995/04", store: 2.875, discount: 0.00, applied: 2.875 },  // バブル崩壊後の低金利政策で店頭金利2.875%に低下。
      { date: "2000/03", store: 2.375, discount: 0.50, applied: 1.875 },  // ゼロ金利政策で店頭金利最低の2.375%に:contentReference[oaicite:1]{index=1}。優遇導入初期で▲0.5%程度の優遇。
      { date: "2007/09", store: 2.875, discount: 1.00, applied: 1.875 },  // 日銀利上げで店頭2.875%に上昇。優遇幅拡大で実質金利は約1.9%に据置。
      { date: "2009/05", store: 2.475, discount: 1.90, applied: 0.575 },  // リーマン後の利下げで店頭2.475%に減少:contentReference[oaicite:2]{index=2}。優遇▲1.90%で適用金利0.575%に低下。
      { date: "2016/02", store: 2.475, discount: 1.90, applied: 0.575 },  // マイナス金利導入後も店頭金利2.475%で不変:contentReference[oaicite:3]{index=3}。優遇幅は最大▲1.9%程度、実質0.5～0.6%台。
      { date: "2023/01", store: 2.475, discount: 1.90, applied: 0.575 },   // 低金利長期化で店頭金利は2009年以降2.475%据置:contentReference[oaicite:4]{index=4}。適用金利0.5～0.6%前後で推移。
      {
        date: "2025/05",
        store: 2.875,
        discount: 2.28,
        applied: 0.595
      },
    ],
    fixed: [
      // 当初固定金利10年型（新規借入時の固定期間金利）。
      { date: "1995/04", store: 6.00, discount: 0.00, applied: 6.00 },   // 長期金利高水準期。店頭表示6%前後で優遇なし。
      { date: "2000/04", store: 4.00, discount: 0.50, applied: 3.50 },   // 長期金利低下に伴い店頭約4%、優遇▲0.5%程度で実質3.5%程度。
      { date: "2008/04", store: 5.00, discount: 0.50, applied: 4.50 },   // 景気回復で長期金利上昇。店頭5%前後、優遇小幅。
      { date: "2016/08", store: 1.50, discount: 0.70, applied: 0.80 },   // マイナス金利で長期金利史上最低水準。店頭表示1～2%、優遇▲0.7%程度で実質0.8%台に低下。
      { date: "2023/01", store: 3.00, discount: 1.40, applied: 1.60 },   // 長期金利0%近辺で低位安定。店頭約3%、優遇▲1.4%で適用約1.6%。
      { date: "2025/01", store: 4.30, discount: 2.67, applied: 1.63 },    // 金利上昇局面で店頭表示4%台後半に上昇。優遇後の適用金利1.63%:contentReference[oaicite:5]{index=5}。
      {
        date: "2025/05",
        store: 4.61,
        discount: 2.78,
        applied: 1.83
      }
    ]
  },
  {
    bankName: "三井住友銀行",
    url: "https://www.smbc.co.jp/kojin/jutaku_loan/",
    variable: [
      // ※変動金利。優遇幅拡大が他行比で緩やか。
      { date: "1995/04", store: 2.875, discount: 0.00, applied: 2.875 },  // 当時優遇なし。
      { date: "2000/03", store: 2.375, discount: 0.30, applied: 2.075 },  // 優遇開始（▲0.3%程度）。
      { date: "2009/05", store: 2.475, discount: 1.20, applied: 1.275 },  // 店頭2.475%:contentReference[oaicite:6]{index=6}、優遇幅▲1.2%程度で約1.3%に低下。
      { date: "2016/02", store: 2.475, discount: 1.50, applied: 0.975 },  // 優遇拡大（▲1.5%程度）で実質1%を下回る。
      { date: "2023/01", store: 2.475, discount: 1.55, applied: 0.925 },  // 優遇▲1.55%。適用金利約0.925%:contentReference[oaicite:7]{index=7}。
      { date: "2025/01", store: 2.875, discount: 1.95, applied: 0.925 },  // 短期金利上昇で店頭2.875%に。優遇後0.925%:contentReference[oaicite:8]{index=8}（主要プラン）。
      {
        date: "2025/05",
        store: 2.875,
        discount: 2.280,
        applied: 0.595
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "1997/04", store: 4.50, discount: 0.00, applied: 4.50 },   // 店頭表示約4.5%。固定期間選択型が普及し始める。
      { date: "2005/04", store: 3.00, discount: 0.20, applied: 2.80 },   // 長期金利低下により店頭金利3%台に。
      { date: "2010/04", store: 2.50, discount: 0.30, applied: 2.20 },   // フラット35金利2%台:contentReference[oaicite:9]{index=9}の中、実質金利も2%台前半。
      { date: "2016/08", store: 2.00, discount: 0.80, applied: 1.20 },   // 店頭金利約2%。優遇拡大で適用1%台前半。
      { date: "2023/01", store: 4.50, discount: 1.95, applied: 2.55 },   // 店頭表示金利4.50%、最優遇適用後2.55%（新規/Web申込）:contentReference[oaicite:10]{index=10}。
      { date: "2025/01", store: 4.50, discount: 1.95, applied: 2.55 },   // 2025年時点も店頭約4.5%、適用金利2.55%で推移:contentReference[oaicite:11]{index=11}。
      {
        date: "2025/05",
        store: 4.500,
        discount: 2.500,
        applied: 2.000
      }
    ]
  },
  {
    bankName: "みずほ銀行",
    url: "https://www.mizuhobank.co.jp/loan_housing/index.html",
    variable: [
      // ※変動金利。大手行中でも優遇幅大。
      { date: "1995/04", store: 2.875, discount: 0.00, applied: 2.875 },
      { date: "2000/03", store: 2.375, discount: 0.80, applied: 1.575 },  // 他行同様に優遇開始（▲0.8%程度）。
      { date: "2009/05", store: 2.475, discount: 1.70, applied: 0.775 },  // 店頭2.475%:contentReference[oaicite:12]{index=12}、優遇幅▲1.7%で0.8%弱に低下。
      { date: "2016/02", store: 2.475, discount: 1.90, applied: 0.575 },  // 優遇▲1.9%。適用金利0.525%～0.975%の範囲:contentReference[oaicite:13]{index=13}。
      { date: "2023/01", store: 2.475, discount: 1.95, applied: 0.525 },  // 優遇拡大（▲1.95%程度）。ネット専用ローンで0.525%～適用:contentReference[oaicite:14]{index=14}。
      { date: "2025/01", store: 2.625, discount: 2.10, applied: 0.525 },   // 政策金利見直しで店頭2.625%に上昇も、優遇▲2.10%で実質0.525%を維持:contentReference[oaicite:15]{index=15}。
      {
        date: "2025/06",
        store: 2.875, // 店頭金利は明示されていないため、一般的な数値を仮定
        discount: 2.35,
        applied: 0.525
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "1997/04", store: 4.00, discount: 0.00, applied: 4.00 },   // 店頭表示約4%。優遇なし。
      { date: "2005/04", store: 3.00, discount: 0.00, applied: 3.00 },   // 店頭表示約3%。優遇なしだが公的ローン低下で水準低め。
      { date: "2010/04", store: 2.20, discount: 0.00, applied: 2.20 },   // 店頭表示約2.2%。低金利だが店頭金利＝適用金利で提供。
      { date: "2016/08", store: 1.70, discount: 0.10, applied: 1.60 },   // 店頭表示1.70%、僅かな優遇で1.60%に:contentReference[oaicite:16]{index=16}（保証料一部前払い型は+0.05%）。
      { date: "2023/01", store: 3.70, discount: 2.10, applied: 1.60 },   // 店頭表示金利3.70%、優遇▲2.10%で適用1.60%:contentReference[oaicite:17]{index=17}。
      { date: "2025/01", store: 4.00, discount: 2.40, applied: 1.60 },   // 店頭約4.0%、優遇▲2.40%で適用金利1.60%（ネット専用ローンの場合）:contentReference[oaicite:18]{index=18}。
      {
        date: "2025/06",
        store: 4.24, // 店頭金利は明示されていないため、一般的な数値を仮定
        discount: 2.44,
        applied: 1.80
      }
    ]
  },
  {
    bankName: "りそな銀行",
    url: "https://www.resonabank.co.jp/kojin/jutaku/",
    variable: [
      // ※変動金利。優遇幅は大手行並み（近年は約▲1.9%）。
      { date: "1995/04", store: 2.875, discount: 0.00, applied: 2.875 },
      { date: "2000/03", store: 2.375, discount: 0.70, applied: 1.675 },  // 優遇開始。
      { date: "2008/04", store: 2.875, discount: 1.20, applied: 1.675 },  // 店頭2.875%に対し▲1.2%優遇。
      { date: "2009/10", store: 2.475, discount: 1.70, applied: 0.775 },  // 店頭2.475%、優遇▲1.7%。
      { date: "2016/02", store: 2.475, discount: 1.90, applied: 0.575 },  // 優遇▲1.9%。実質0.5～0.6%台。
      { date: "2023/01", store: 2.475, discount: 1.90, applied: 0.575 },  // 店頭金利不変:contentReference[oaicite:19]{index=19}、最優遇適用で0.575%程度。
      {
        date: "2025/01",
        store: 2.875,
        discount: 2.235,
        applied: 0.640
      },
      {
        date: "2025/05",
        store: 2.875,
        discount: 2.235,
        applied: 0.640
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "2000/04", store: 4.00, discount: 0.00, applied: 4.00 },   // 店頭表示約4%。優遇なし。
      { date: "2006/04", store: 3.20, discount: 0.20, applied: 3.00 },   // 店頭表示約3.2%。一部優遇導入。
      { date: "2010/04", store: 2.50, discount: 0.30, applied: 2.20 },   // 店頭表示2.5%。優遇▲0.3%で適用2.2%。
      { date: "2016/08", store: 1.20, discount: 0.40, applied: 0.80 },   // 店頭表示約1.2%。優遇▲0.4%で適用0.8%台。
      { date: "2020/01", store: 2.50, discount: 1.50, applied: 1.00 },   // 店頭表示約2.5%。優遇▲1.5%で適用約1.0%。
      { date: "2023/01", store: 3.60, discount: 2.00, applied: 1.60 },   // 店頭表示約3.6%。優遇▲2.0%で適用1.6%前後。
      {
        date: "2025/01",
        store: 4.290,
        discount: 2.235,
        applied: 2.055
      },
      {
        date: "2025/05",
        store: 4.290,
        discount: 2.235,
        applied: 2.055
      }
    ]
  },
  {
    bankName: "PayPay銀行",
    url: "https://www.paypay-bank.co.jp/mortgage/index.html",
    variable: [
      // ※変動金利。旧ジャパンネット銀行。2019年より住宅ローン開始:contentReference[oaicite:20]{index=20}。
      { date: "2019/07", store: 2.475, discount: 2.000, applied: 0.475 }, // 取扱開始時、店頭2.475%、優遇▲2.0%で適用0.475%程度。
      { date: "2020/12", store: 2.475, discount: 2.045, applied: 0.430 }, // 業界最低水準を狙い優遇拡大、実質0.4%台前半に低下。
      { date: "2023/10", store: 2.430, discount: 1.965, applied: 0.465 }, // 店頭表示金利2.430%、適用金利0.465%:contentReference[oaicite:21]{index=21}（優遇▲1.965%）。
      {
        date: "2025/05",
        store: 2.430,
        discount: 1.965,
        applied: 0.465
      }
    ],
    fixed: [
      // 当初固定金利10年型（住信SBIネット銀行提携ローン商品）。
      { date: "2019/07", store: 1.00, discount: 0.00, applied: 1.00 },   // サービス開始当初の10年固定金利約1.0%で提供。
      { date: "2021/01", store: 0.85, discount: 0.00, applied: 0.85 },   // 長期金利低位安定で0.8%台前半の低金利水準。
      { date: "2023/01", store: 1.30, discount: 0.00, applied: 1.30 },   // 金利上昇により10年固定約1.3%に上昇。
      {
        date: "2025/05",
        store: 1.30,
        discount: 0.00,
        applied: 1.30
      }
    ]
  },
  {
    bankName: "住信SBIネット銀行",
    url: "https://www.netbk.co.jp/contents/lineup/home-loan/",
    variable: [
      // ※変動金利。ネット専業で大幅優遇。2007年開業。
      { date: "2007/09", store: 2.875, discount: 1.50, applied: 1.375 }, // サービス開始当初から大幅優遇で1%台半ば。
      { date: "2010/04", store: 2.475, discount: 1.80, applied: 0.675 }, // 実質金利0.7%近辺まで低下。
      { date: "2016/02", store: 2.475, discount: 2.00, applied: 0.475 }, // 優遇▲2.0%超。適用金利0.5%割れ（水準トップクラス）。
      { date: "2023/01", store: 2.475, discount: 2.10, applied: 0.375 }, // 店頭金利2.475%、最優遇▲2.10%で実質0.375%程度に。
      {
        date: "2025/05",
        store: 3.275,
        discount: 2.627,
        applied: 0.648
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "2008/04", store: 2.80, discount: 0.00, applied: 2.80 },   // 開始当初、10年固定金利約2.8%。
      { date: "2016/08", store: 0.90, discount: 0.00, applied: 0.90 },   // 長期金利低下で史上最低水準の0.90%。
      { date: "2023/01", store: 1.30, discount: 0.00, applied: 1.30 },   // 足元の金利上昇で1.3%前後に上昇。
      {
        date: "2025/05",
        store: 3.690,
        discount: 1.951,
        applied: 1.739
      }
    ]
  },
  {
    bankName: "auじぶん銀行",
    url: "https://www.jibunbank.co.jp/products/homeloan/",
    variable: [
      // ※変動金利。2008年開業（旧：じぶん銀行）。KDDIと三菱UFJの共同出資。
      { date: "2008/07", store: 2.875, discount: 1.00, applied: 1.875 }, // 開業当初、優遇▲1%程度。
      { date: "2013/04", store: 2.475, discount: 1.50, applied: 0.975 }, // 優遇拡大で適用金利1%を切る水準に。
      { date: "2016/02", store: 2.475, discount: 1.90, applied: 0.575 }, // 優遇▲1.9%に拡大。実質0.5%台半ば。
      { date: "2023/01", store: 2.591, discount: 2.112, applied: 0.479 }, // 店頭表示2.591%、適用金利0.479%:contentReference[oaicite:22]{index=22}。
      {
        date: "2025/05",
        store: 2.841,
        discount: 2.112,
        applied: 0.729
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "2010/04", store: 2.50, discount: 0.00, applied: 2.50 },   // 取扱当初は約2.5%。
      { date: "2016/08", store: 0.80, discount: 0.00, applied: 0.80 },   // 0.8%台まで低下。
      { date: "2023/01", store: 1.20, discount: 0.00, applied: 1.20 },   // 長期金利上昇で1.2%程度に。
      {
        date: "2025/05",
        store: 4.365,
        discount: 1.825,
        applied: 2.540
      }
    ]
  },
  {
    bankName: "ソニー銀行",
    url: "https://sonybank.jp/products/hl/",
    variable: [
      // ※変動金利。2001年開業。当初より低金利競争をリード。
      { date: "2001/06", store: 2.375, discount: 0.50, applied: 1.875 }, // 開業時から優遇金利導入（実質1%台）。
      { date: "2006/04", store: 2.875, discount: 1.30, applied: 1.575 }, // 優遇幅拡大（▲1.3%）。
      { date: "2016/02", store: 2.475, discount: 1.90, applied: 0.575 }, // 優遇▲1.9%。適用金利0.5%台。
      { date: "2023/01", store: 2.475, discount: 2.00, applied: 0.475 }, // 店頭2.475%、優遇▲2.0%で実質0.475%。
      {
        date: "2025/05",
        store: 2.492,
        discount: 1.595,
        applied: 0.897
      }
    ],
    fixed: [
      // 当初固定金利10年型。
      { date: "2005/04", store: 2.50, discount: 0.00, applied: 2.50 },   // 10年固定約2.5%。
      { date: "2016/08", store: 0.70, discount: 0.00, applied: 0.70 },   // 最低水準の0.7%。
      { date: "2023/01", store: 1.10, discount: 0.00, applied: 1.10 },   // 約1.1%に上昇。
      {
        date: "2025/05",
        store: 3.234,
        discount: 0.950,
        applied: 2.284
      }
    ]
  }
]

// グラフの色を定義
export const bankColors = [
  '#5470c6', // 青
  '#91cc75', // 緑
  '#fac858', // 黄
  '#ee6666', // 赤
  '#73c0de', // 水色
  '#3ba272', // 深緑
  '#fc8452', // オレンジ
  '#9a60b4', // 紫
  '#ea7ccc', // ピンク
  '#48b3bd', // ターコイズ
]
// グラフの色を定義
export const policyRateColor = '#ff0000'

// 銀行名から色を取得する関数
export const getBankColor = (bankName: string, banks: InterestRateData[]) => {
  const index = banks.findIndex(bank => bank.bankName === bankName)
  return bankColors[index % bankColors.length]
}
