import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import QueueAnim from 'rc-queue-anim';

export default function({components}){
    return(
        <Layout>
            <Header>{components.header}</Header>
            <Layout>
                <QueueAnim delay={300}>
                    <Sider key="1">{components.sider}</Sider>
                    <Content key="2">{components.content}</Content>
                </QueueAnim>
            </Layout>
            <Footer>{components.footer}</Footer>
        </Layout>
    );
}