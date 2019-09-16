<template>
  <el-form ref="demoForm"
           :model="demoForm"
           :rules="rules"
           label-position="left"
           label-width="80px"
           size="small">
    <el-form-item label="姓名"
                  prop="name">
      <el-input v-model="demoForm.name"
                placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="年龄"
                  prop="age">
      <el-input v-model.number="demoForm.age"
                placeholder="请输入年龄"></el-input>
    </el-form-item>
    <el-form-item label="生日"
                  prop="birthdate">
      <el-date-picker style="width:100% "
                      v-model="demoForm.birthdate"
                      type="date"
                      :editable="false"
                      placeholder="请输入生日">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">保存</el-button>
      <el-button @click="resetDemoForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import demoApi from '@business/demo/api'
export default {
  props: ['demoId'],
  data () {
    return {
      demoForm: {
        id: this.$props.demoId,
        name: '',
        age: '',
        birthdate: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        birthdate: [
          { required: true, message: '请输入生日', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.demoForm.id) {
      demoApi.getDemoById(this.demoForm.id).then(res => {
        this.demoForm = res.data.data
      })
    } else {
      this.resetDemoForm()
    }
  },
  methods: {
    onSubmit () {
      this.$refs['demoForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.demoForm.id === '') {
          // 新增demo
          demoApi.addDemo(this.demoForm).then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
            this.resetDemoForm()
          })
        } else {
          // 修改demo
          demoApi.updateDemo(this.demoForm).then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
          })
        }
      })
    },
    resetDemoForm () {
      this.$refs['demoForm'].resetFields()
    }
  }
}
</script>
