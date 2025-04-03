<template>
  <div class="forecast-container">
    <div class="page-header">
      <h2 class="title">Forecast Management</h2>
    </div>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span class="card-title">Forecast Orders</span>
      </div>
      <div class="card-content">
        <el-table
          :data="paginatedData"
          style="width: 100%"
          border
          @sort-change="handleSortChange"
        >
          <el-table-column
            prop="order"
            label="Order"
            sortable="custom"
          >
            <template slot="header" slot-scope="scope">
              <div class="column-header">
                <span>Order</span>
                <el-input
                  v-model="orderSearch"
                  placeholder="Search"
                  size="mini"
                  @input="handleOrderSearch"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="quantity"
            label="Quantity"
            sortable="custom"
          >
            <template slot="header" slot-scope="scope">
              <div class="column-header">
                <span>Quantity</span>
                <el-input
                  v-model="quantitySearch"
                  placeholder="Search"
                  size="mini"
                  @input="handleQuantitySearch"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="deliveryDate"
            label="Delivery Date"
            sortable="custom"
          >
            <template slot="header" slot-scope="scope">
              <div class="column-header">
                <span>Delivery Date</span>
                <el-date-picker
                  v-model="dateSearch"
                  type="date"
                  placeholder="Select date"
                  size="mini"
                  @change="handleDateSearch"
                />
              </div>
            </template>
            <template slot-scope="scope">
              {{ formatDate(scope.row.deliveryDate) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="materialNumber"
            label="Material Number"
            sortable="custom"
          >
            <template slot="header" slot-scope="scope">
              <div class="column-header">
                <span>Material Number</span>
                <el-input
                  v-model="materialNumberSearch"
                  placeholder="Search"
                  size="mini"
                  @input="handleMaterialNumberSearch"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="materialDescription"
            label="Material Description"
            sortable="custom"
          >
            <template slot="header" slot-scope="scope">
              <div class="column-header">
                <span>Material Description</span>
                <el-input
                  v-model="materialDescriptionSearch"
                  placeholder="Search"
                  size="mini"
                  @input="handleMaterialDescriptionSearch"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredData.length"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Forecast',
  data() {
    return {
      tableData: [],
      orderSearch: '',
      quantitySearch: '',
      dateSearch: '',
      materialNumberSearch: '',
      materialDescriptionSearch: '',
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    filteredData() {
      return this.tableData.filter(row => {
        const orderMatch = !this.orderSearch || row.order.toLowerCase().includes(this.orderSearch.toLowerCase())
        const quantityMatch = !this.quantitySearch || row.quantity.toString().includes(this.quantitySearch)
        const dateMatch = !this.dateSearch || this.formatDate(row.deliveryDate) === this.formatDate(this.dateSearch)
        const materialNumberMatch = !this.materialNumberSearch || row.materialNumber.toLowerCase().includes(this.materialNumberSearch.toLowerCase())
        const materialDescriptionMatch = !this.materialDescriptionSearch || row.materialDescription.toLowerCase().includes(this.materialDescriptionSearch.toLowerCase())
        
        return orderMatch && quantityMatch && dateMatch && materialNumberMatch && materialDescriptionMatch
      })
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredData.slice(start, end)
    }
  },
  created() {
    this.generateMockData()
  },
  methods: {
    generateMockData() {
      const materials = [
        { number: 'M001', description: 'Steel Plate' },
        { number: 'M002', description: 'Aluminum Bar' },
        { number: 'M003', description: 'Copper Wire' },
        { number: 'M004', description: 'Plastic Sheet' },
        { number: 'M005', description: 'Rubber Seal' }
      ]

      const mockData = []
      for (let i = 1; i <= 50; i++) {
        const material = materials[Math.floor(Math.random() * materials.length)]
        const date = new Date()
        date.setDate(date.getDate() + Math.floor(Math.random() * 30))
        
        mockData.push({
          order: `ORD${String(i).padStart(5, '0')}`,
          quantity: Math.floor(Math.random() * 1000) + 100,
          deliveryDate: date,
          materialNumber: material.number,
          materialDescription: material.description
        })
      }
      this.tableData = mockData
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    handleSortChange({ prop, order }) {
      this.tableData.sort((a, b) => {
        if (order === 'ascending') {
          return a[prop] > b[prop] ? 1 : -1
        } else if (order === 'descending') {
          return a[prop] < b[prop] ? 1 : -1
        }
        return 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleOrderSearch(value) {
      this.orderSearch = value
      this.currentPage = 1
    },
    handleQuantitySearch(value) {
      this.quantitySearch = value
      this.currentPage = 1
    },
    handleDateSearch(value) {
      this.dateSearch = value
      this.currentPage = 1
    },
    handleMaterialNumberSearch(value) {
      this.materialNumberSearch = value
      this.currentPage = 1
    },
    handleMaterialDescriptionSearch(value) {
      this.materialDescriptionSearch = value
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast-container {
  padding: 20px;

  .page-header {
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-title {
        font-size: 18px;
        font-weight: 500;
        color: #333;
      }
    }

    .card-content {
      .column-header {
        display: flex;
        flex-direction: column;
        gap: 8px;

        span {
          font-weight: 500;
        }

        .el-input,
        .el-date-picker {
          width: 100%;
        }
      }

      .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

// 添加表格动画效果
.el-table {
  .el-table__body-wrapper {
    transition: all 0.3s ease;
  }
}

// 添加页面切换动画
.el-table__body-wrapper {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 