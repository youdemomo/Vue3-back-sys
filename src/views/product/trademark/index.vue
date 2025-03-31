<script lang="ts" setup>
    import { ref } from 'vue';

    // 当前页码
    const pageNo = ref<number>(1)
    // 每页展示的行数
    const limit = ref<number>(3)
</script>

<template>
    <div>
        <el-card>
            <!-- 顶部添加品牌按钮 -->
            <el-button type="primary" size="default" class="btn" icon="Plus">添加品牌</el-button>

            <!-- 展示品牌表格 -->
            <el-table border style="elTable">
                <!-- 第一列 -->
                <el-table-column label="序号" width="80px" align="center">
                </el-table-column>

                <!-- 第二列 -->
                <el-table-column label="品牌名称" align="center">
                </el-table-column>

                <!-- 第三列 -->
                <el-table-column label="品牌logo" align="center">
                </el-table-column>

                <!-- 第四列 -->
                <el-table-column label="品牌操作" align="center">
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination class="page" v-model:current-page="pageNo" v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]" :size="size" :disabled="disabled" :background="true"
                layout="prev, pager, next, jumper, ->, total, sizes" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<style scoped lang="scss">

    // el-button按钮样式异常丢失，手动补充
    .btn {
        background-color: #3895f3;
        color: white;
        padding: 14px 26px;
        padding-left: 20px;
        line-height: 32px;
        margin: 10px 0;
    }

    .btn:hover {
        background-color: #71b8ff;
    }

    .page {
        margin-top: 20px;
        margin-bottom: 2px;
        margin-left: 6px;
    }
</style>
