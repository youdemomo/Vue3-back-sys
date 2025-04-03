<script lang="ts" setup>
    import { useCategoryStore } from '../../../store/modules/category'
    import { getAttrAPI, addOrUpdateAttrAPI } from '../../../api/product/attr'
    import { reactive, ref, watch } from 'vue'
    import { ElMessage } from 'element-plus'

    // todo: 获取商品属性
    const categoryStore = useCategoryStore()

    // 存储商品属性
    const attrArr = ref()

    // bro: 获取已有属性
    const getAttr = async () => {
        const { c1Id, c2Id, c3Id } = categoryStore
        if (c3Id) {
            const res = await getAttrAPI(c1Id, c2Id, c3Id)
            // console.log(res)

            if (res.code === 200) {
                attrArr.value = res.data
            }
        }
    }

    // bro: 监听仓库三级分类Id的变化
    watch(
        () => categoryStore.c3Id,
        async () => {
            // 清空商品属性数组
            attrArr.value = []
            // 获取属性列表
            await getAttr()
        },
    )

    // todo: 添加/修改商品属性
    // 添加/修改接口传参
    const attrParams = reactive({
        // 属性id，修改时需要传入
        // id: '',
        // 属性名
        attrName: '',
        // 新增属性数组
        attrValueList: [],
        // 所属三级分类id
        categoryId: 0,
        // 分类级别，默认为3
        categoryLevel: 3,
    })
    // 控制卡片变化
    const isShowEdit = ref(false)

    // 属性值输入框失焦时回调
    const toLook = (row, $index) => {
        // 返回属性值重复的项
        const repeatRow = attrParams.attrValueList.find((item) => {
            if (item != row) {
                return item.valueName === row.valueName
            }
        })

        // 清空属性值重复的项
        if (repeatRow) {
            attrParams.attrValueList.splice($index, 1)
            ElMessage({
                type: 'error',
                message: `属性值：${repeatRow.valueName} 已经存在`,
            })
            return
        }

        // 该行属性值存在才能变为div
        if (row.valueName.trim() == '') {
            // 从接口传参中去除属性值为空的项目
            attrParams.attrValueList.splice($index, 1)
            ElMessage({
                type: 'warning',
                message: '属性值不能为空',
            })
            return
        }
        row.editFlag = false
    }

    // 属性输入框点击回调
    const toEdit = (row) => {
        row.editFlag = true
    }

    // 添加属性按钮回调
    const addAttrBtn = () => {
        // 清除上一次传参
        Object.assign(attrParams, {
            attrName: '',
            attrValueList: [],
            categoryId: 0,
            categoryLevel: 3,
        })
        isShowEdit.value = true
    }

    // 表格内编辑按钮回调
    const updateBtn = () => {
        isShowEdit.value = true
    }

    // 取消按钮回调
    const cancelBtn = () => {
        isShowEdit.value = false
    }

    // 添加属性值按钮回调
    const addAttrValueBtn = () => {
        // 向属性值数组中添加一个对象
        attrParams.attrValueList.push({
            valueName: '',
            // 控制输入框和div的切换
            editFlag: true,
        })
    }

    // bro: 保存按钮回调
    const saveBtn = async () => {
        // 获取当前属性所属三级分类id
        attrParams.categoryId = categoryStore.c3Id

        // 发送请求
        const res: any = await addOrUpdateAttrAPI(attrParams)
        // console.log(res)

        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '添加/修改属性成功',
            })
            // 切换面板，再次获取三级分类列表
            await getAttr()
            isShowEdit.value = false
        } else {
            ElMessage({
                type: 'error',
                message: '添加/修改属性失败',
            })
        }
    }
</script>

<template>
    <div>
        <!-- 顶部卡片 -->
        <Category :isBanSelect="isShowEdit"></Category>

        <!-- 底部卡片 -->
        <el-card class="footerCard">
            <!-- 未点击添加按钮时渲染 -->
            <div v-show="!isShowEdit">
                <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttrBtn"
                    >添加商品属性</el-button
                >
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
                            <el-button type="primary" size="small" icon="Edit" @click="updateBtn"></el-button>
                            <!-- 删除按钮 -->
                            <el-button type="primary" size="small" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 点击添加/编辑按钮后渲染 -->
            <div v-show="isShowEdit">
                <el-form inline>
                    <!-- 属性名输入框 -->
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 添加属性按钮 -->
                <el-button type="primary" size="default" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrValueBtn"
                    >添加属性值</el-button
                >
                <el-button type="primary" size="default" @click="cancelBtn">取消</el-button>
                <!-- 添加属性面板 -->
                <el-table border :data="attrParams.attrValueList">
                    <!-- 第一列 -->
                    <el-table-column width="80px" align="center" label="序号" type="index"></el-table-column>
                    <!-- 第二列 -->
                    <el-table-column label="属性值">
                        <template #="{ row, $index }">
                            <el-input
                                v-show="row.editFlag"
                                @blur="toLook(row, $index)"
                                placeholder="请输入属性值名称"
                                v-model="row.valueName"></el-input>
                            <div v-show="!row.editFlag" @click="toEdit(row)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <!-- 第三列 -->
                    <el-table-column width="100px" align="center" label="操作"></el-table-column>
                </el-table>
                <!-- 保存更改按钮 -->
                <el-button
                    type="primary"
                    size="default"
                    @click="saveBtn"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true"
                    >保存</el-button
                >
                <el-button type="primary" size="default" @click="cancelBtn">取消</el-button>
            </div>
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
