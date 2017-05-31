import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import QueueAnim from 'rc-queue-anim';

export default function({components}){
    return(
        <Layout>
            <Header>{components.header}</Header>
            <Layout>
                <QueueAnim delay={300}>
                    <Content key="1">{components.content}</Content>
                    <Sider key="2">{components.sider}</Sider>
                </QueueAnim>
            </Layout>
            <Footer>{components.footer}</Footer>
        </Layout>
    );
}