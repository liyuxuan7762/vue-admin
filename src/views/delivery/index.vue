<template>
  <div class="app-container">
    <div class="page-header">
      <h2 class="page-title">Delivery</h2>
    </div>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span class="card-title">Delivery Management</span>
      </div>
      <div class="card-content">
        Delivery content will be displayed here.
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Delivery',
  data() {
    return {
      // 组件数据
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  
  .page-header {
    margin-bottom: 20px;
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      padding: 0;
    }
  }

  .box-card {
    .card-header {
      display: flex;
      align-items: center;
      
      .card-title {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }
    }

    .card-content {
      padding: 10px 0;
      color: #606266;
      line-height: 1.6;
    }
  }
}
</style> 