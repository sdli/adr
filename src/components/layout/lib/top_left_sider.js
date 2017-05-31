import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import QueueAnim from 'rc-queue-anim';

export default function({components}){
    return(
        <Layout>
            <Sider>{components.sider}</Sider>
            <Layout>
                <QueueAnim delay={300}>
                    <Header key="1">{components.header}</Header>
                    <Content key="2">{components.content}</Content>
                    <Footer key="3">{components.footer}</Footer>
                </QueueAnim>
            </Layout>
        </Layout>
    );
}