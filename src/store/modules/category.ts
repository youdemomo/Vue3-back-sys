// 商品分类全局组件仓库
import { defineStore } from 'pinia'
import { getC1API, getC2API, getC3API } from '../../api/product/attr'
import { ref } from 'vue'

export const useCategoryStore = defineStore('Category', () => {
    // todo: 一级分类
    // 存储一级分类列表
    const c1Arr = ref([])

    // 获取一级分类列表
    const getC1List = async () => {
        const res: any = await getC1API()
        // console.log(res)
        c1Arr.value = res.data
    }

    // 存储选中的一级分类id
    const c1Id = ref('')

    // todo: 二级分类列表
    // 存储二级分类列表
    const c2Arr = ref([])

    // 获取二级分类列表
    const getC2List = async () => {
        const res: any = await getC2API(c1Id.value)
        // console.log(res)
        c2Arr.value = res.data
    }

    // 存储选中的二级分类id
    const c2Id = ref('')

    // todo: 三级分类列表
    const c3Arr = ref([])

    // 获取三级分类列表
    const getC3List = async () => {
        const res: any = await getC3API(c2Id.value)
        console.log(res)
        c3Arr.value = res.data
    }

    // 存储选中的三级分类id
    const c3Id = ref('')

    // todo: 清空分类数据
    // 清空二级、三级分类
    const clearC2C3 = () => {
        c2Id.value = ''
        c3Id.value = ''
        c2Arr.value = []
        c3Arr.value = []
    }

    // 清空三级分类
    const clearC3 = () => {
        c3Id.value = ''
        c3Arr.value = []
    }

    return {
        getC1List,
        c1Arr,
        c1Id,
        c2Arr,
        getC2List,
        c2Id,
        c3Arr,
        getC3List,
        c3Id,
        clearC2C3,
        clearC3,
    }
})
