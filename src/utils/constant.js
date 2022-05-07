//export const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.boldwolf.com.vn' : 'http://localhost:3000'
export const API_URL = 'https://api.boldwolf.com.vn'
// 

export const ROUTE = {
    LOGIN: '/login',
    DASH_BOARD: '/',
    BANNER: '/banner',
    TOURS: '/tours-adventure',
    TEAM_BUILDING: '/team-building',
    BLOG: '/blog',
    REVIEW: '/review',
    SAFETY: '/safety',
    ABOUT: '/about',
    EXPLORER: '/explorer',
    CUSTOMER: '/customer'
}

export const MODE = {
    ADD: 'add',
    UPDATE: 'update'
}

export const MESSAGE_REQUIRED = 'Vui lòng nhập dữ liệu'
export const MESSAGE_ADD_SUCCESS = 'Thêm thành công'
export const MESSAGE_UPDATE_SUCCESS = 'Chỉnh sửa thành công'
export const MESSAGE_DELETE_SUCCESS = 'Xóa thành công'
export const MESSAGE_SUCCESS = 'Thành công' // add or update
export const MESSAGE_ERROR = 'Có lỗi xảy ra. Vui lòng thử lại sau' // add or update

export const METHOD_AXIOS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
}

export const MODAL_CONFIRM_MSG_DELETE = 'Bạn có chắc chắn muốn xóa'
export const ACTIVE_KEY = 'activeKey'

export const OPTIONS_LEVEL = [{ key: 'Easy', value: 'Easy' }, { key: 'Normal', value: 'Normal' }, { key: 'Hard', value: 'Hard' }]
export const OPTIONS_TYPE = [{ key: 'Glamping', value: 'Glamping' }, { key: 'Glamping Adventure', value: 'Glamping Adventure' },{ key: 'Glamping Address', value: 'Glamping Address' }]


export const SAFE_TYPE = {
    RULE: 'Rule',
    PROGRESS: 'Progress',
    TEAM: 'Team',
    DEVICE: 'Device',
    MAXIM: 'Maxim',
}

export const BANNER_TYPE = {
    HOME: 'home',
    ABOUT: 'about',
    SAFETY: 'safety',
    TOUR: 'tour',
    TEAM: 'team-building',
    LIST_TOUR: 'list_tour',
    LIST_TEAM_BUILDING: 'list_team_building',
    LIST_ADVENTURE: 'list_adventure',
    BLOG: 'blog',
    EXPLORER: 'explorer'
}

export const ABOUT_TYPE = {
    OVERVIEW: 'Overview',
    COREVALUE: 'Core_value',
    MEMBER: 'Member',
    MAXIM: 'Maxim',
    PRODUCT_VALUE: "Product_value"
}

export const ADVENTURE_TYPE = {
    TEAM: 'Team',
    DEVICE: 'Device',
    SAFETY: 'Safety',
    EXPERIENCE: 'Experience',
    EXPLORER: 'Explorer'
}

export const OVERVIEW_TYPE = {
    TOUR: 'Tour',
    TEAM_BUILDING: 'Team building'
}

export const UPLOAD_TYPE = {
    TOUR: 'TOUR',
    TEAM_BUILDING: 'TEAM_BUILDING'
}

export const MAX_IMG_TEAM_BUILDING = 14
export const MAX_IMG_TOUR = 14

export const EDITOR_INLINE_STYLE = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

export const EDITOR_BLOCK_TYPE = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
]
