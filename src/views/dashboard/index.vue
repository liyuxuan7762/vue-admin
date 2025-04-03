<template>
  <div class="dashboard-container">
    <!-- First Layer: Key Metrics -->
    <div class="dashboard-header">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in metrics" :key="index">
          <el-card class="metric-card" :class="{ 'animate-in': true }">
            <div class="metric-content">
              <div class="metric-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="metric-info">
                <div class="metric-title">{{ item.title }}</div>
                <div class="metric-value" :class="{ 'changed': item.changed }">
                  {{ item.value }}
                  <span class="trend" :class="item.trend">
                    <i :class="item.trend === 'up' ? 'el-icon-top' : 'el-icon-bottom'"></i>
                    {{ item.percentage }}%
                  </span>
                </div>
                <div class="metric-chart" ref="miniChart"></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Second Layer: Main Analysis -->
    <div class="dashboard-main">
      <el-card class="trend-card">
        <div slot="header">
          <span>30-Day Business Trend</span>
        </div>
        <div class="trend-chart" ref="trendChart"></div>
      </el-card>
    </div>

    <!-- Third Layer: Multi-dimensional Analysis -->
    <div class="dashboard-analysis">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="analysis-card">
            <div slot="header">
              <span>Category Analysis</span>
            </div>
            <div class="category-chart" ref="categoryChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="analysis-card">
            <div slot="header">
              <span>Regional Distribution</span>
            </div>
            <div class="region-chart" ref="regionChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="analysis-card">
            <div slot="header">
              <span>Quantity-Time Correlation</span>
            </div>
            <div class="scatter-chart" ref="scatterChart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      metrics: [
        {
          title: 'Forecast Orders',
          value: '1,234',
          trend: 'up',
          percentage: '12.5',
          icon: 'el-icon-s-order',
          changed: false,
          miniChartData: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          title: 'Pending Orders',
          value: '56',
          trend: 'down',
          percentage: '8.2',
          icon: 'el-icon-time',
          changed: false,
          miniChartData: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          title: 'In-Transit Logistics',
          value: '789',
          trend: 'up',
          percentage: '15.3',
          icon: 'el-icon-truck',
          changed: false,
          miniChartData: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          title: 'Near-Due Orders',
          value: '23',
          trend: 'down',
          percentage: '5.7',
          icon: 'el-icon-warning',
          changed: false,
          miniChartData: [320, 332, 301, 334, 390, 330, 320]
        }
      ],
      charts: {
        mini: [],
        trend: null,
        category: null,
        region: null,
        scatter: null
      }
    }
  },
  mounted() {
    this.initCharts()
    this.startDataSimulation()
  },
  beforeDestroy() {
    // Clean up charts
    Object.values(this.charts).forEach(chart => {
      if (chart) {
        chart.dispose()
      }
    })
  },
  methods: {
    initCharts() {
      // Initialize mini charts
      this.$nextTick(() => {
        this.metrics.forEach((metric, index) => {
          const chart = echarts.init(this.$refs.miniChart[index])
          this.charts.mini.push(chart)
          this.updateMiniChart(chart, metric.miniChartData)
        })

        // Initialize main charts
        this.charts.trend = echarts.init(this.$refs.trendChart)
        this.charts.category = echarts.init(this.$refs.categoryChart)
        this.charts.region = echarts.init(this.$refs.regionChart)
        this.charts.scatter = echarts.init(this.$refs.scatterChart)

        this.updateMainCharts()
      })
    },
    updateMiniChart(chart, data) {
      const option = {
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: data,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2
          },
          areaStyle: {
            opacity: 0.1
          }
        }]
      }
      chart.setOption(option)
    },
    updateMainCharts() {
      // Trend Chart
      this.charts.trend.setOption({
        title: {
          text: 'Business Trend'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: Array.from({length: 30}, (_, i) => `Day ${i + 1}`)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 1000)),
          type: 'line',
          smooth: true,
          animation: true
        }]
      })

      // Category Chart
      this.charts.category.setOption({
        title: {
          text: 'Category Distribution'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Category A', 'Category B', 'Category C', 'Category D']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80],
          type: 'bar',
          animation: true
        }]
      })

      // Region Chart
      this.charts.region.setOption({
        title: {
          text: 'Regional Distribution'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Region A' },
            { value: 735, name: 'Region B' },
            { value: 580, name: 'Region C' },
            { value: 484, name: 'Region D' }
          ],
          animation: true
        }]
      })

      // Scatter Chart
      this.charts.scatter.setOption({
        title: {
          text: 'Quantity-Time Correlation'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'scatter',
          data: Array.from({length: 50}, () => [
            Math.random() * 100,
            Math.random() * 100
          ]),
          animation: true
        }]
      })
    },
    startDataSimulation() {
      setInterval(() => {
        // Update metrics randomly
        this.metrics.forEach(metric => {
          const change = Math.random() > 0.5
          if (change) {
            const oldValue = parseInt(metric.value.replace(/,/g, ''))
            const newValue = oldValue + Math.floor(Math.random() * 100 - 50)
            metric.value = newValue.toLocaleString()
            metric.trend = newValue > oldValue ? 'up' : 'down'
            metric.percentage = (Math.random() * 10).toFixed(1)
            metric.changed = true
            setTimeout(() => {
              metric.changed = false
            }, 500)
          }
        })

        // Update mini charts
        this.metrics.forEach((metric, index) => {
          const chart = this.charts.mini[index]
          const newData = [...metric.miniChartData.slice(1), Math.floor(Math.random() * 500)]
          metric.miniChartData = newData
          this.updateMiniChart(chart, newData)
        })
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;

  .dashboard-header {
    margin-bottom: 20px;

    .metric-card {
      height: 120px;
      transition: all 0.3s ease;
      
      &.animate-in {
        animation: fadeIn 0.5s ease-out;
      }

      .metric-content {
        display: flex;
        height: 100%;

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: #ecf5ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;

          i {
            font-size: 24px;
            color: #409EFF;
          }
        }

        .metric-info {
          flex: 1;
          display: flex;
          flex-direction: column;

          .metric-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
          }

          .metric-value {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            display: flex;
            align-items: center;

            .trend {
              font-size: 12px;
              margin-left: 8px;
              display: flex;
              align-items: center;

              &.up {
                color: #67C23A;
              }

              &.down {
                color: #F56C6C;
              }

              i {
                margin-right: 4px;
              }
            }
          }

          .metric-chart {
            flex: 1;
            min-height: 40px;
          }
        }
      }
    }
  }

  .dashboard-main {
    margin-bottom: 20px;

    .trend-card {
      .trend-chart {
        height: 400px;
      }
    }
  }

  .dashboard-analysis {
    .analysis-card {
      height: 400px;

      .category-chart,
      .region-chart,
      .scatter-chart {
        height: 350px;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// Card hover effect
.el-card {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

// Value change animation
.metric-value {
  &.changed {
    animation: pulse 0.5s ease-in-out;
  }
}
</style>
