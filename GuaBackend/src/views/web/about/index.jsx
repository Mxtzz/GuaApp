import React, { Component } from 'react'
import './index.less'
import AuthorAvatar from '@/components/web/AuthorAvatar'
import axios from '@/lib/axios'
import { connect } from 'react-redux'
import { generateColorMap } from '@/redux/common/actions'

import { Divider, Rate, Icon } from 'antd'

import Comment from '@/components/web/comment'

@connect(
    null,
    { generateColorMap }
)
class About extends Component {
    state = { commentList: [] }

    componentDidMount() {
        this.fetchList()
    }

    fetchList = () => {
        axios.get('/comment/getAboutComments').then(res => {
            this.props.generateColorMap(res.rows) // 生成头像的颜色匹配
            this.setState({ commentList: res.rows })
        })
    }

    setCommentList = commentList => this.setState({ commentList })

    render() {
        return (
            <div className="content-inner-wrapper about">
                <AuthorAvatar />
                <span className="desc">前端打杂人员，略微代码洁癖</span>
                
                <Comment articleId={-1} commentList={this.state.commentList} setCommentList={this.setCommentList} />
            </div>
        )
    }
}

export default About
