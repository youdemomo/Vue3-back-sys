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
        // console.log(res)

        if (res.code === 200) {
            // 获取品牌总数
            total.value = res.data.total
            // 获取品牌数组
            trademarkArr.value = res.data.records
            // 给数组中每一项添加图片是否失效标识
            trademarkArr.value.forEach(row => {
                row.isImgDie = false; // 确保每行都有 isImgDie
            });
        }
    }

    // todo: 图片失效时用默认图片替代
    const handleImgError = (row) => {
        // 图片失效时触发此回调
        row.isImgDie = true
    };

    // todo: 页数变化时回调
    const handleCurrentChange = () => {
        // console.log('页码变化了');
        getTrademark()
    }

    // todo: 页容量变化时回调
    const handleSizeChange = () => {
        // console.log('页容量变化了');
        pageNo.value = 1 // 页码归1
        getTrademark()
    }

    // todo: 弹窗
    // 控制弹窗显隐
    const dialogFormVisible = ref<boolean>(false)
    // 弹窗标题
    const title = ref<string>('')

    // 添加品牌按钮回调
    const addTrademark = () => {
        dialogFormVisible.value = true
        title.value = '添加品牌'
    }

    // 编辑品牌回调
    const updateTrademark = () => {
        dialogFormVisible.value = true
        title.value = '编辑品牌'
    }

    // 弹窗提交按钮回调
    const confirmBtn = async () => {
        dialogFormVisible.value = false
    }

    onMounted(() => getTrademark())

</script>

<template>
    <div>
        <el-card>
            <!-- 顶部添加品牌按钮 -->
            <el-button type="primary" size="default" class="btn" icon="Plus" @click="addTrademark">添加品牌</el-button>

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
                        <img v-if="!row.isImgDie" :src="`http://localhost:9000${row.logoUrl}`" alt="图片寄了(；′⌒`)"
                            @error="handleImgError(row)" />
                        <img v-else src="../../../assets/images/gura.jpg" alt="本地的也寄了" title="这是本地的图片">
                    </template>
                </el-table-column>
                <!-- 第四列 -->
                <el-table-column label="品牌操作" align="center">
                    <template #="{ row, $index }">
                        <!-- 编辑按钮 -->
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="primary" size="small" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination class="page" v-model:current-page="pageNo" v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]" :background="true" layout="prev, pager, next, jumper, ->, total, sizes"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>

        <!-- 添加/编辑品牌弹窗 -->
        <el-dialog v-model="dialogFormVisible" :title="title" width="600">
            <!-- 弹窗主体表单 -->
            <el-form class="elForm">
                <!-- 品牌名输入框 -->
                <el-form-item label="品牌名称" label-width="90px">
                    <el-input placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <!-- 图片上传 -->
                <el-form-item label="品牌logo" label-width="90px">
                    <el-upload class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>

            <!-- 弹窗底部插槽 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmBtn">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
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

    // 弹窗的form表单
    .elForm {
        width: 70%;
        margin-left: 20px;
    }

    // 弹窗图片上传相关样式
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>

    /* 弹窗图片上传全局样式 */
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>
