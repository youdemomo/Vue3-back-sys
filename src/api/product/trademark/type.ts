// 返回体公共数据
interface ResData {
    code: number
    message: string
}

// todo: 品牌类型
export interface TradeMark {
    id?: number
    tmName: string
    logoUrl: string
}

// todo: 品牌数组类型
export type Records = TradeMark[]

// 品牌接口返回类型
export interface TradeMarkResData extends ResData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}
