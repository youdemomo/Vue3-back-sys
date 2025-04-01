<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue';
    import { getTrademarkAPI, addOrUpTrademarkAPI, delTracdmarkAPI } from '../../../api/product/trademark';
    import type { Records, TradeMarkResData, TradeMark } from '../../../api/product/trademark/type';
    import { ElMessage, type UploadProps } from 'element-plus'

    // 表单实例
    const formRef = ref()

    // todo: 分页器和获取品牌列表
    // 当前页码
    const pageNo = ref<number>(1)
    // 每页展示的行数
    const limit = ref<number>(3)
    // 所有品牌总量（接口返回）
    const total = ref<number>(0)
    // 存储品牌数组（接口返回）
    const trademarkArr = ref<Records>([])


    // bro: 根据分页和显示页数获取数据
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

    // 图片失效时用默认图片替代
    const handleImgError = (row) => {
        // 图片失效时触发此回调
        row.isImgDie = true
    };

    // 页数变化时回调
    const handleCurrentChange = () => {
        // console.log('页码变化了');
        getTrademark()
    }

    // 页容量变化时回调
    const handleSizeChange = () => {
        // console.log('页容量变化了');
        pageNo.value = 1 // 页码归1
        getTrademark()
    }

    onMounted(() => getTrademark())


    // todo: 添加/修改商品弹窗
    // 控制弹窗显隐
    const dialogFormVisible = ref<boolean>(false)
    // 弹窗标题
    const title = ref<string>('')
    // 收集用户弹窗数据
    const tradmarkParams = reactive<TradeMark>({
        tmName: '',
        logoUrl: '',
    })

    // 添加品牌按钮回调
    const addTrademark = () => {
        // 清空弹窗数据
        tradmarkParams.logoUrl = ''
        tradmarkParams.tmName = ''
        Reflect.deleteProperty(tradmarkParams, 'id')

        // 清空校验错误提示信息
        formRef.value?.clearValidate('tmName')
        formRef.value?.clearValidate('logoUrl')

        // 更新弹窗标题
        title.value = '添加品牌'

        dialogFormVisible.value = true
    }

    // 编辑品牌回调
    const updateTrademark = (row) => {
        // 清空校验错误提示信息
        formRef.value?.clearValidate('tmName')
        formRef.value?.clearValidate('logoUrl')

        // 更新弹窗标题
        title.value = '编辑品牌'

        // 更新传参信息
        Object.assign(tradmarkParams, row)

        dialogFormVisible.value = true
    }

    // bro: 弹窗提交按钮回调
    const confirmBtn = async () => {
        // 表单全局校验(根据校验结果返回Promise)
        await formRef.value.validate();

        // 调用接口
        const res = await addOrUpTrademarkAPI(tradmarkParams)
        console.log(res);
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: tradmarkParams.id ? '修改成功' : '添加成功'
            })
            dialogFormVisible.value = false
            // 再次获取所有品牌
            if (!tradmarkParams.id) {
                // 添加商品后返回首页
                pageNo.value = 1
            }
            await getTrademark()
        } else {
            ElMessage({
                type: 'error',
                message: '添加品牌失败'
            })
        }
    }

    // 图片上传前的钩子
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        // console.log(rawFile)
        // 限制文件格式
        if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif') {
            // 限制文件大小
            if (rawFile.size / 1024 / 1024 <= 20) {
                return true
            } else {
                ElMessage({
                    type: 'error',
                    message: '文件大小不能超过20MB'
                })
                return fasle
            }
        } else {
            ElMessage({
                type: 'error',
                message: '格式只能是：PNG|JPG|GIF'
            })
            return fasle
        }
    }

    // 图片上传后的钩子
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        // console.log(response)
        // console.log(uploadFile)
        // 获取服务器返回的图片URL
        tradmarkParams.logoUrl = response.data.logoUrl

        // 清除logo校验的错误信息
        formRef.value.clearValidate('logoUrl')
    }

    // todo: 弹窗表单校验
    // tmName自定义规则函数
    const validatorTmName = (rule: any, value: any, callBack: any) => {
        if (value.trim().length >= 2) {
            // 校验成功
            callBack()
        } else {
            // 校验失败
            callBack(new Error('品牌名称不能小于2位'))
        }
    }

    // logoUrl自定义规则函数（全局校验中触发）
    const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
        if (value) {
            callBack()
        } else {
            callBack(new Error('图片上传失败'))
        }
    }

    // 规则对象
    const rules = {
        tmName: [
            {
                // 该项必填
                required: true,
                // 校验触发时机 blur:失焦 change:文本变化
                trigger: 'blur',
                // 自定义校验
                validator: validatorTmName
            }
        ],
        logoUrl: [
            {
                required: true,
                validator: validatorLogoUrl
            }
        ]
    }

    // todo: 删除品牌
    // 气泡确认框回调
    const delTracdmark = async (id: number) => {
        const res = await delTracdmarkAPI(id)
        // console.log(res)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            // 如果删除后该页无商品，则返回上一页
            if (trademarkArr.value.length <= 1) {
                pageNo.value -= 1
            }
            await getTrademark()
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            })
        }
    } 
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
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-popconfirm :title="`确定要删除：${row.tmName} 品牌吗？`" width="200px" icon="Delete"
                            @confirm="delTracdmark(row.id)">
                            <template #reference>
                                <el-button size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
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
            <el-form class="elForm" :model="tradmarkParams" :rules="rules" ref="formRef">
                <!-- 品牌名输入框 -->
                <el-form-item label="品牌名称" label-width="90px" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="tradmarkParams.tmName"></el-input>
                </el-form-item>
                <!-- 图片上传 -->
                <el-form-item label="品牌logo" label-width="90px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/product/baseTrademark/uploadPicture"
                        :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tradmarkParams.logoUrl" :src="`http://localhost:9000${tradmarkParams.logoUrl}`"
                            class="avatar" />
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
