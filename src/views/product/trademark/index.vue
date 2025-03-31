<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { getTrademarkAPI } from '../../../api/product/trademark';
    import type { Records, TradeMarkResData } from '../../../api/product/trademark/type';

    // 当前页码
    const pageNo = ref<number>(1)
    // 每页展示的行数
    const limit = ref<number>(3)
    // 所有品牌总量（接口返回）
    const total = ref<number>(0)
    // 存储品牌数组（接口返回）
    const trademarkArr = ref<Records>([])


    // todo: 根据分页和显示页数获取数据
    const getTrademark = async () => {
        const res: TradeMarkResData = await getTrademarkAPI(pageNo.value, limit.value)
        console.log(res)

        if (res.code === 200) {
            // 获取品牌总数
            total.value = res.data.total
            // 获取品牌数组
            trademarkArr.value = res.data.records
        }
    }

    // todo: 图片失效时用默认图片替代
    const isImgDie = ref(false)
    const handleImgError = () => {
        // 图片失效时触发此回调
        isImgError.value = true;
    };

    onMounted(() => getTrademark())
</script>

<template>
    <div>
        <el-card>
            <!-- 顶部添加品牌按钮 -->
            <el-button type="primary" size="default" class="btn" icon="Plus">添加品牌</el-button>

            <!-- 展示品牌表格 -->
            <el-table border :data="trademarkArr">
                <!-- 第一列 -->
                <el-table-column label="序号" width="80px" align="center" type="index">
                </el-table-column>
                <!-- 第二列 -->
                <el-table-column label="品牌名称" align="center" prop="tmName">
                </el-table-column>
                <!-- 第三列 -->
                <el-table-column label="品牌logo" align="center">
                    <template #="
                        { row, $index }">
                        <img v-if="isImgDie" :src="row.logoUrl" alt="图片寄了(；′⌒`)" @error="handleImgError" />
                        <img v-else src="../../../assets/images/gura.jpg" alt="本地的也寄了" title="这是本地的图片">
                    </template>
                </el-table-column>
                <!-- 第四列 -->
                <el-table-column label="品牌操作" align="center">
                    <template #="{ row, $index }">
                        <!-- 编辑按钮 -->
                        <el-button type="primary" size="small" icon="Edit"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="primary" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination class="page" v-model:current-page="pageNo" v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]" :size="size" :disabled="disabled" :background="true"
                layout="prev, pager, next, jumper, ->, total, sizes" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<style scoped lang="scss">

    .btn {
        padding: 14px 26px;
        padding-left: 20px;
        line-height: 32px;
        margin: 10px 0;
    }


    // 分页器
    .page {
        margin-top: 20px;
        margin-bottom: 2px;
        margin-left: 6px;
    }

    // logo图片
    img {
        display: block;
        margin: 0 auto;
        width: 100px;
        height: 100px;
    }
</style>
