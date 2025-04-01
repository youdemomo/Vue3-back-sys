// 品牌管理模块
import request from '../../../utils/request'
import type { TradeMarkResData, TradeMark } from './type'

enum API {
    // 获取品牌
    TRADEMARK_URL = '/product/baseTrademark',
    // 添加品牌
    ADDTRADMARK_URL = '/product/baseTrademark/add',
    // 修改品牌
    UPDATETRADMARK_URL = '/product/baseTrademark/update',
}

// todo: 获取品牌
// page：获取第几页
// limit：一页装几个
export const getTrademarkAPI = (page: number, limit: number) =>
    request<any, TradeMarkResData>({
        url: API.TRADEMARK_URL + `/${page}/${limit}`,
    })

// todo: 修改/添加品牌
export const addOrUpTrademarkAPI = (data: TradeMark) => {
    if (data.id) {
        // 修改品牌
        return request<any, any>({
            url: API.UPDATETRADMARK_URL,
            method: 'PUT',
            data,
        })
    } else {
        // 添加品牌
        return request<any, any>({
            url: API.ADDTRADMARK_URL,
            method: 'POST',
            data,
        })
    }
}
