import React from 'react';
import PropTypes from 'prop-types';
import './TableCommon.scss'
import { Table, Empty } from 'antd';

export const TableCommon = ({ columns, dataSource, onRowClick, x }) => {
    return (
        <div className="table-common">
            <Table columns={columns} dataSource={dataSource}
                bordered
                scroll={{ x:  x || '700px'}}
                onRow={(record) => ({ onClick: () => onRowClick && onRowClick(record.id) })}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No data"
                        />
                    ),
                }}
            />
        </div>
    );
};

TableCommon.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array,
    onRowClick: PropTypes.func,
    x: PropTypes.number
};