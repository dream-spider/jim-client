/***
*  .--,       .--,
* ( (  \.---./  ) )
*  '.__/o   o\__.'
*     {=  ^  =}
*      >  -  |
*     /       \
*    //       \\
*   //|   .   |\\
*   "'\       /'"_.-~^`'-.
*      \  _  /--'         `
*    ___)( )(___
*   (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
*/
<template>
  <div>
    <div v-show="demoListShow">
      <el-form ref="queryForm"
               :model="queryForm"
               :inline="true">
        <el-form-item label="姓名">
          <el-input v-model.trim="query.name"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.trim="query.age"
                    placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="query.birthdate"
                          type="date"
                          :editable="false"
                          placeholder="请输入生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="handleQuery()">查询</el-button>
          <el-button v-if="addButtonPermission"
                     type="primary"
                     icon="el-icon-plus"
                     @click="addDemo()">新增</el-button>
          <el-button v-if="addButtonPermission"
                     type="primary"
                     @click="resetQueryForm()">重置</el-button>
          <el-switch style="padding-left:5px"
                     v-model="optMode"
                     active-text="页面模式"
                     inactive-text="弹窗模式"
                     active-value="page"
                     inactive-value="dialog"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading"
                :data="tableData.data">
        <el-table-column label="ID"
                         width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名"
                         width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover"
                        placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>生日: {{ scope.row.birthdate }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="年龄"
                         width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生日"
                         width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.birthdate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button size="mini"
                       icon="el-icon-edit-outline"
                       type="info"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       icon="el-icon-delete"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-size="5"
                     layout="total, sizes ,prev, pager, next, jumper"
                     :page-sizes="[5, 10, 20, 50]"
                     :total="tableData.total">
      </el-pagination>
    </div>
    <div v-if="addDemoPageShow"
         style="width: 60%">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     style="padding-bottom:10px;">
        <el-breadcrumb-item><a @click="goBack">demo列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ formTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
      <demo-form :demoId="editDemoId"></demo-form>
    </div>
    <div v-if="formDialogVisable">
      <el-dialog :visible.sync="formDialogVisable"
                 :title="formTitle"
                 :before-close="beforeCloseDemo"
                 style="width: 60%">
        <demo-form :demoId.sync="editDemoId"></demo-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import demoApi from '@business/demo/api'
import DemoForm from '@business/demo/components/DemoForm'
import constants from '@common/constants'
export default {
  components: {
    'demo-form': DemoForm
  },
  data () {
    return {
      queryForm: {
        loc: {},
        area: {},
        industryType: {},
        sceneType: ''
      },
      editDemoId: '',
      query: { id: null, name: null, age: null, birthdate: null, pageNum: 1, pageSize: 5 },
      addDemoPageShow: false,
      demoListShow: true,
      formDialogVisable: false,
      optMode: 'page',
      formTitle: '',
      loc: {},
      area: {},
      industryType: {},
      sceneType: '',
      commonSearch: {},
      tableData: {
        data: [],
        total: 0,
        pageNum: 1
      },
      loading: false,
      addButtonPermission: this.$store.getters['auth/hasPermission'](constants.authCode.demo.DEMO_BTN_ADD)
    }
  },
  created () {
    this.handleQuery()
  },
  computed: {

  },
  methods: {
    resetQueryForm () {
      this.$refs['queryForm'].resetFields()
    },
    beforeCloseDemo (done) {
      this.handleQuery()
      done()
    },
    handleEdit (index, row) {
      this.editDemoId = row.id
      switch (this.optMode) {
        case 'page':
          this.addDemoPageShow = true
          this.demoListShow = false
          break
        case 'dialog':
          this.formDialogVisable = true
          break
      }
      this.formTitle = '修改信息[' + row.name + ']'
    },
    handleDelete (index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        demoApi.deleteDemo(row.id).then(res => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.handleQuery()
        }).catch(() => {

        })
      })
    },
    addDemo () {
      this.editDemoId = ''
      switch (this.optMode) {
        case 'page':
          this.addDemoPageShow = true
          this.demoListShow = false
          break
        case 'dialog':
          this.formDialogVisable = true
          break
      }
      this.formTitle = '新增demo信息'
    },
    goBack () {
      switch (this.optMode) {
        case 'page':
          this.addDemoPageShow = false
          this.demoListShow = true
          break
        case 'dialog':
          this.formDialogVisable = false
          break
      }
      this.handleQuery()
    },
    handleQuery () {
      this.loading = true
      demoApi.queryDemoList(this.query).then((res) => {
        let resData = res.data.data
        this.tableData.data = resData.list
        this.tableData.total = resData.total
        this.tableData.pageNum = resData.pageNum
        this.loading = false
      })
    },
    handleCurrentChange (pageNum) {
      this.query.pageNum = pageNum
      this.handleQuery()
    },
    handleSizeChange (pageSize) {
      this.query.pageSize = pageSize
      this.handleQuery()
    }
  }
}
</script>
