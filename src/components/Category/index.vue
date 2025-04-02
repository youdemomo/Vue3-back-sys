<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { getC1API, getC2API, getC3API } from '../../api/product/attr'
    import { useCategoryStore } from '../../store/modules/category'

    // 获取分类商店
    const categoryStore = useCategoryStore()

    // 获取编辑面板显隐标识
    defineProps(['isBanSelect'])

    // todo: 获取一级分类列表
    const getC1 = () => {
        categoryStore.getC1List()
    }
    onMounted(() => getC1())

    // todo: 获取二级分类列表
    // 一级列表选项变化时的回调
    const c1Handler = () => {
        // 清空二级、三级分类数据
        categoryStore.clearC2C3()
        // 获取二级列表
        categoryStore.getC2List()
    }

    // todo: 获取三级分类列表
    const c2Handler = () => {
        // 清空三级分类数据
        categoryStore.clearC3()
        // 获取三级列表
        categoryStore.getC3List()
    }
</script>

<template>
    <el-card class="headerCard">
        <el-form inline>
            <!-- 一级分类 -->
            <el-form-item label="一级分类">
                <el-select
                    v-model="categoryStore.c1Id"
                    placeholder="一级分类"
                    style="width: 168px"
                    @change="c1Handler"
                    :disabled="isBanSelect">
                    <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 二级分类 -->
            <el-form-item label="二级分类">
                <el-select
                    v-model="categoryStore.c2Id"
                    placeholder="二级分类"
                    style="width: 168px"
                    @change="c2Handler"
                    :disabled="isBanSelect">
                    <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 三级分类 -->
            <el-form-item label="三级分类">
                <el-select placeholder="三级分类" style="width: 168px" v-model="categoryStore.c3Id" :disabled="isBanSelect">
                    <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped></style>
