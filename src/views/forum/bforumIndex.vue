<template>
  <div class="forum">
    <div class="header"></div>
    <el-container>
      <el-aside width="400px">
        <ul class="feedlistMod">
          <li v-for="item in forumList" :key="item.id">
            <div class="list_con">
              <div class="title">
                <h4>
                  <a href="##">{{item.title}}</a>
                </h4>
              </div>
              <div class="summary oneline">
                <p>{{item.content}}</p>
              </div>
              <p>
                <span class="peopleimg fl">
                  <img src="../../assets/th1.jpg" alt />
                </span>
                <span>{{item.user.name}}</span>
              </p>
            </div>
          </li>
          <li>
            <el-pagination
              small
              background
              :current-page="page"
              @size-change="handleSizeChange"
              :page-sizes="[30,50,80]"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            />
          </li>
        </ul>
      </el-aside>

      <el-main>
        <div class="main">
          <h2>这是标题一</h2>
          <p>
            <span class="span1">一只工程狮</span>
            <span>最后发布于</span>
            <span>2020-02-10 19:23:01</span>
          </p>
          <div class="content">
            <pre>  这是内容</pre>
          </div>
          <div class="foot">
            <div class="footcontent">
              <div class="img">
                <img src="../../assets/th1.jpg" alt />
              </div>
              <div>
                <el-input type="textarea" width="100%;" placeholder="想对同事说点什么?"></el-input>
              </div>
              <el-button class="fr" style="margin-top:3px" type="sccuss" size="mini">发送</el-button>
            </div>
          </div>
          <div class="foottwo">
            <ul>
              <li>
                <div class="foottwoimg">
                  <img src="../../assets/th1.jpg" alt />
                  <span class="f700">kye</span>
                  <span class="font12">3个月前</span>
                  <p>这是评论</p>
                  <ul>
                    <li>
                      <div class="foottwoimg">
                        <img src="../../assets/th1.jpg" alt />
                        <span class="f700">kye</span>
                        <span>回复</span>
                        <span class="f700">kye</span>
                        <span class="font12">3个月前</span>
                        <p>这是评论</p>
                      </div>
                    </li>
                    <li>
                      <div class="foottwoimg">
                        <img src="../../assets/th1.jpg" alt />
                        <span class="f700">kye</span>
                        <span>回复</span>
                        <span class="f700">kye</span>
                        <span class="font12">3个月前</span>
                        <p>这是评论</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

      ids: '',
      forumList: [],
      total: 0,
      page: 1,
      pageSize: 50
    }
  },
  created () {
    this.getForumList()

    this.ids = ''
    console.log(this.ids)
  },
  methods: {

    async getForumList () {
      const res = await this.$http.forumList({ page: this.page, pageSize: this.pageSize, userId: this.ids })
      console.log(res)
      this.forumList = res.result
      this.total = res.result.length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.getForumList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getForumList()
    }
  }

}
</script>
<style lang='scss' scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #ccc;
}
.oneline {
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 350px;
  }
}
li {
  padding: 18px 17px 13px 18px;
  background: #fff;
  border-bottom: 1px solid #f4f4f4;
  position: relative;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
}
li:hover {
  background-color: rgba(228, 228, 228, 0.1);
}
fl {
  float: left;
}
.summary {
  margin: 10px 0;
}
.peopleimg {
  vertical-align: middle;
  display: inline-block;
  img {
    width: 20px;
    border-radius: 50%;
  }
}
</style>
<style lang='scss' scoped>
.main {
  h2 {
    margin-bottom: 10px;
  }
  p {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    .span1 {
      color: coral;
      font-size: 12px;
    }
  }
  .content {
    padding-top: 20px;
  }
  .fl {
    float: left;
  }
  .foot {
    margin-top: 20px;
    width: 100;
    height: 100px;
    padding: 10px 30px 10px 40px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .footcontent {
      width: 100%;
      height: 90px;
      // background: red;
      .img {
        position: relative;
        left: -24px;
        top: 40%;
        img {
          width: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}
.fr {
  float: right;
}
.foottwoimg {
  img {
    width: 20px;
    vertical-align: middle;
    border-radius: 50%;
  }

  .f700 {
    font-weight: 700;
  }
  .font12 {
    font-size: 10px;
    color: #ccc;
  }
  p {
    margin-top: 10px;

    font-size: 10px;
  }
}
</style>
