// 属性管理API
import request from '../../../utils/request'

enum API {
    // 获取一级分类
    C1_URL = '/product/getCategory1',
    // 获取二级分类
    C2_URL = '/product/getCategory2',
    // 获取三级分类
    C3_URL = '/product/getCategory3',
    // 获取商品属性
    ATTR_URL = '/product/attrInfoList',
    // 添加/修改商品属性
    ADDORUPDATE_URL = '/product/saveAttrInfo',
    // 删除商品属性
    DELETEATTR_URL = '/product/deleteAttr',
}

// todo: 获取一级分类
export const getC1API = () =>
    request<any, any>({
        url: API.C1_URL,
    })

// todo: 获取二级分类
export const getC2API = (id: number) =>
    request<any, any>({
        url: API.C2_URL + `/${id}`,
    })

// todo: 获取三级分类
export const getC3API = (id: number) =>
    request<any, any>({
        url: API.C3_URL + `/${id}`,
    })

// todo: 获取商品属性
export const getAttrAPI = (c1Id: number, c2Id: number, c3Id: number) =>
    request<any, any>({
        url: API.ATTR_URL + `/${c1Id}/${c2Id}/${c3Id}`,
    })

// todo: 添加/修改商品属性
export const addOrUpdateAttrAPI = (data: any) =>
    request<any, any>({
        url: API.ADDORUPDATE_URL,
        method: 'POST',
        data,
    })

// todo: 删除商品属性
export const deleteAttrAPI = (attrId) =>
    request({
        url: API.DELETEATTR_URL + `/${attrId}`,
        method: 'DELETE',
    })
