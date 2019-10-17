import { config } from 'isdk'
import Vue from 'vue'
import { 
  Table, 
  TableColumn, 
  Main, 
  Container, 
  Loading, 
  Button,
  Row,
  Col,
  Avatar,
  Link,
  Menu,
  MenuItem,
  Input,
  Badge,
  ButtonGroup,
  Drawer,
  Pagination,
} from 'element-ui'

config.configIsdk({
  axios: {
    requestContext: process.env.SERVICE_REQUEST_CTX
  }
})
const components = [
  Table, TableColumn, Main, Container,
  Loading, Button, Row, Col, Avatar,
  Link,
  Menu,
  MenuItem,
  Input,
  Badge,
  ButtonGroup,
  Drawer,
  Pagination,
]
components.forEach((component) => {
  Vue.use(component)
})

Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})