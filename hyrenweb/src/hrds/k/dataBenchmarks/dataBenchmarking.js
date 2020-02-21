import request from '@/utils/request'
// 1 基础信息
// 获取初始表信息
export function getDbmNormbasicInfo(data) {
    return request({
        url: 'K/dbmnormbasic/getDbmNormbasicInfo',
        params: data,
    })
}

//添加标准分类
export function addDbmNormbasicInfo(data) {
    return request({
        url: 'K/dbmnormbasic/addDbmNormbasicInfo',
        params: data,
    })
}

// 删除方法
/* export function deleteDbmNormbasicInfo(data) {
    return request({
        url: 'K/dbmnormbasic/deleteDbmNormbasicInfo',
        params:data,
    })
} */
//2:代码配置
// 代码类新增
export function addDbmCodeTypeInfo(data) {
    return request({
        url: 'K/dbmcodetypeinfo/addDbmCodeTypeInfo',
        params: data,
    })
}

// 代码类-分页获取数据
export function getDbmCodeTypeInfo(data) {
    return request({
        url: 'K/dbmcodetypeinfo/getDbmCodeTypeInfo',
        params: data,
    })
}

//代码类-编辑
export function getDbmSortInfoById(data) {
    return request({
        url: 'K/dbmcodetypeinfo/getDbmSortInfoById',
        params: data,
    })
}

//代码类-编辑保存
export function updateDbmCodeTypeInfo(data) {
    return request({
        url: 'K/dbmcodetypeinfo/updateDbmCodeTypeInfo',
        params: data,
    })
}

//代码类-删除分类方法
export function deleteDbmCodeTypeInfo(data) {
    return request({
        url: 'K/dbmcodetypeinfo/deleteDbmCodeTypeInfo',
        params: data,
    })
}

//根据类id获取所有代码项
export function getDbmCodeItemInfoByCodeTypeId(data) {
    return request({
        url: 'K/dbmcodeiteminfo/getDbmCodeItemInfoByCodeTypeId',
        params: data,
    })
}

// 新增代码项
export function addDbmCodeItemInfo(data) {
    return request({
        url: 'K/dbmcodeiteminfo/addDbmCodeItemInfo',
        params: data,
    })
}

// 编辑代码项
export function updateDbmCodeItemInfo(data) {
    return request({
        url: 'K/dbmcodeiteminfo/updateDbmCodeItemInfo',
        params: data,
    })
}

// 编辑代码项打开
export function getItemDbmSortInfoById(data) {
    return request({
        url: 'K/dbmcodeiteminfo/getDbmSortInfoById',
        params: data,
    })
}

// 删除代码项
export function deleteDbmCodeItemInfo(data) {
    return request({
        url: 'K/dbmcodeiteminfo/deleteDbmCodeItemInfo',
        params: data,
    })
}

// 3：标准分类配置
// 添加
export function addDbmSortInfo(data) {
    return request({
        url: 'K/dbmsortinfo/addDbmSortInfo',
        params: data,
    })
}

//编辑保存
export function updateDbmSortInfo(data) {
    return request({
        url: 'K/dbmsortinfo/updateDbmSortInfo',
        params: data,
    })
}

//获取
export function getClassDbmSortInfo(data) {
    return request({
        url: 'K/dbmsortinfo/getDbmSortInfo',
        params: data,
    })
}

//编辑打开
export function getclassDbmSortInfoById(data) {
    return request({
        url: 'K/dbmsortinfo/getDbmSortInfoById',
        params: data,
    })
}

//删除
export function deleteDbmSortInfo(data) {
    return request({
        url: 'K/dbmsortinfo/deleteDbmSortInfo',
        params: data,
    })
}

//获取分类树信息

export function getDbmSortInfoTreeData() {
    return request({
        url: 'K/dbmtree/getDbmSortInfoTreeData',
    })
}
