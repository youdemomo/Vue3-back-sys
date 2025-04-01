<script lang='ts' setup>

</script>

<template>
    <div>
        <!-- 顶部卡片 -->
        <Category></Category>

        <!-- 底部卡片 -->
        <el-card class="footerCard">
            <el-button type="primary" size="default" icon="Plus">添加商品属性</el-button>
            <el-table border>
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" align="center"></el-table-column>
                <el-table-column label="属性值名称" align="center"></el-table-column>
                <el-table-column label="操作" width="120px" align="center"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
    .headerCard {
        margin: 12px 0;
    }
</style>