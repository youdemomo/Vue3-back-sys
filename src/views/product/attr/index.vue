<script lang="ts" setup>
    import { useCategoryStore } from '../../../store/modules/category'
    import { getAttrAPI } from '../../../api/product/attr'
    import { ref, watch } from 'vue'

    const categoryStore = useCategoryStore()

    // 存储商品属性
    const attrArr = ref()

    // 监听仓库三级分类Id的变化
    watch(
        () => categoryStore.c3Id,
        async () => {
            // 清空商品属性数组
            attrArr.value = []
            // 获取分类id
            const { c1Id, c2Id, c3Id } = categoryStore
            // c3Id不为空才发送请求
            if (c3Id) {
                const res = await getAttrAPI(c1Id, c2Id, c3Id)
                // console.log(res)

                if (res.code === 200) {
                    attrArr.value = res.data
                }
            }
        },
    )
</script>

<template>
    <div>
        <!-- 顶部卡片 -->
        <Category></Category>

        <!-- 底部卡片 -->
        <el-card class="footerCard">
            <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加商品属性</el-button>
            <el-table border :data="attrArr">
                <!-- 第一列 -->
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>

                <!-- 第二列 -->
                <el-table-column label="属性值名称" align="center" prop="attrName" width="120px"></el-table-column>

                <!-- 第三列 -->
                <el-table-column label="属性名称">
                    <template #="{ row, $index }">
                        <el-tag type="primary" class="elTag" v-for="item in row.attrValueList" :key="item.attrId">{{
                            item.valueName
                        }}</el-tag>
                    </template>
                </el-table-column>

                <!-- 第四列 -->
                <el-table-column label="操作" width="130px" align="center">
                    <template #="{ row, $index }">
                        <!-- 编辑按钮 -->
                        <el-button type="primary" size="small" icon="Edit"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="primary" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
    .headerCard {
        margin: 12px 0;
    }

    // 属性标签
    .elTag {
        margin-right: 10px;
        margin-bottom: 4px;
        margin-top: 4px;
    }
</style>
