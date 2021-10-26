import Head from 'next/head';
import { useAppState } from "../components/shared/AppProvider";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, notification, Popover, Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' }
        ],
        width: '20%'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    }
];

const ProblemsPage = () => {
    const [_state, dispatch] = useAppState();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    function showError() {
        notification["error"]({
            message: "Error Title",
            description: "Deskripsi error klean",
        });
    }

    function showSukses() {
        notification["success"]({
            message: "Sukses Title",
            description: "Deskripsi sukses klean",
        });
    }

    useEffect(() => {
        dispatch({ type: 'showLoading' });
        setTimeout(() => {
            dispatch({ type: 'hideLoading' });
        }, 1000);
    }, []);

    const popOver = (
        <div>
            <div>
                <table className="popOverFilter">
                    <tr>
                        <td>
                            Last 3 hour
                        </td>
                        <td>
                            Last 15 hour
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Last 6 hour
                        </td>
                        <td>
                            Last 18 hour
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Last 9 hour
                        </td>
                        <td>
                            Last 21 hour
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Last 12 hour
                        </td>
                        <td>
                            Last 24 hour
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )

    const popOverTitle = (
        <a style={{ float: "right" }} onClick={() => setPopoverVisible(false)}>
            <img alt="silang" src="/images/icon/silang.svg" />
        </a>
    )

    const handleTableChange = (paginationA, filtersA, sorterA) => {
        console.log(paginationA, filtersA, sorterA);
        const pager = { ...pagination };
        pager.current = paginationA.current;
        setPagination(pager);

        fetchbro(
            {
                results: paginationA.pageSize,
                page: paginationA.current,
                sortField: sorterA.field,
                sortOrder: sorterA.order,
                ...filtersA
            }
        )
    };

    const fetchbro = async (params = {}) => {
        console.log('params:', params);
        // this.setState({ loading: true });
        setLoading(true);
        const data = {
            results: 10,
            ...params
        }
        const datar = await axios.get('https://randomuser.me/api', { params: data });
        const pagination = { ...pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        setLoading(false);
        setData(datar.data.results);
        console.log(datar.data.results);
        setPagination(pagination);
    };

    useEffect(() => {
        fetchbro();
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/react-vis.css" />
            </Head>

            <Row>
                <Col xs={12} sm={12} md={12} lg={18} >
                    <h1 className="headerTitle">
                        Demo Tabel
                    </h1>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} >
                    <Row>
                        <div className="" style={{ marginLeft: "auto" }}>
                            <Row >
                                <p className="fontFilter">
                                    Filter
                                </p>
                                <Popover
                                    content={popOver}
                                    title={popOverTitle}
                                    trigger="click"
                                    visible={popoverVisible}
                                    onVisibleChange={visible => setPopoverVisible(visible)}
                                >
                                    <div className="wrapperFilter pointer">
                                        <p className="fontFilterWaktu">
                                            &nbsp;Default &nbsp;&nbsp; <img alt="option" style={{ paddingLeft: "40px", paddingRight: "10px" }} src="/images/icon/option.svg" />
                                        </p>
                                    </div>
                                </Popover>

                            </Row>
                        </div>
                    </Row>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    );
}



export default ProblemsPage;
