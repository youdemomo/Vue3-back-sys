// 品牌管理模块
import request from '../../../utils/request'

enum API {
    TRADEMARK_URL = '/product/baseTrademark',
}

// todo: 获取品牌
// page：获取第几页
// limit：一页装几个
export const getTrademarkAPI = (page: number, limit: number) =>
    request<any, any>({
        url: API.TRADEMARK_URL + `/${page}/${limit}`,
    })
