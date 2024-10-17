CREATE DATABASE online_tickets_booking_phuongtrang CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

USE online_tickets_booking_phuongtrang;

-- Bảng customers (Loại khách hàng).
CREATE TABLE customer_types (
    customer_type_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_type_name VARCHAR(50), -- Loại khách hàng (ví dụ: Thường, VIP, Công ty, Vãn Lai)
		customer_type_destination VARCHAR(255)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng customers (Khách hàng)
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
		customer_full_name VARCHAR(20),
    customer_phone VARCHAR(20), -- DEFAULT.
    customer_email VARCHAR(255),
		customer_gender TINYINT(1),
		customer_birthday TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		customer_avatar_url VARCHAR(255),
		customer_destination_address JSON, -- Địa chỉ lưu bằng JSON {"province": "value1", "district": "value2", "commune": "value2"}
		customer_password VARCHAR(255),
    is_disabled TINYINT(1), -- Trạng thái chặn người dùng.
		last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		access_token VARCHAR(255),
		refresh_token VARCHAR(255),
    last_refresh_token TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		is_deleted TINYINT(1), -- Trạng thái xóa.
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		customer_type_id INT, 
    CONSTRAINT fk_customer_type FOREIGN KEY (customer_type_id) REFERENCES customer_types(customer_type_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng regions (Khu vực)
CREATE TABLE regions (
    region_id INT AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR(255) NOT NULL, -- Tên khu vực (Ví dụ: Miền Trung, Miền Bắc, Miền Nam)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng provinces (Tỉnh thành)
CREATE TABLE provinces (
    province_id INT AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(255),
    province_description VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		region_id INT, -- Tỉnh thành thuộc khu vực.
		FOREIGN KEY (region_id) REFERENCES regions(region_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng districts (Huyện/Thị xã/Quận)
CREATE TABLE districts (
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    district_name VARCHAR(255),
    district_description VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    province_id INT, -- Thêm khóa ngoại tới bảng provinces
    FOREIGN KEY (province_id) REFERENCES provinces(province_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng offices (Bến xe/Văn phòng)
CREATE TABLE offices (
    office_id INT AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(255),
    office_address VARCHAR(255), 
    office_phone VARCHAR(20),
    office_fax VARCHAR(20),
    office_description VARCHAR(255),
		office_latitude VARCHAR(255),
		office_longitude VARCHAR(255),
		office_map_url VARCHAR(255),
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    district_id INT, -- Thêm khóa ngoại tới bảng districts
    FOREIGN KEY (district_id) REFERENCES districts(district_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng office_images (Hình ảnh của Bến xe/Văn phòng)
CREATE TABLE office_images (
    office_image_id INT AUTO_INCREMENT PRIMARY KEY,
    office_image_url VARCHAR(255) NOT NULL, -- Đường dẫn hoặc URL của hình ảnh
    office_image_description VARCHAR(255), -- Mô tả hình ảnh (nếu có)
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		office_id INT,  -- Khóa ngoại liên kết với bảng offices
    FOREIGN KEY (office_id) REFERENCES offices(office_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

CREATE TABLE vehicle_types (
    vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type_name VARCHAR(50) NOT NULL UNIQUE, -- Tên loại xe
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicle_seats (Ghế)
CREATE TABLE map_vehicle_seats (
    map_vehicle_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    map_vehicle_seat_code VARCHAR(10) NOT NULL, -- Mã ghế (Ví dụ: A11)
    map_vehicle_seat_row_no INT NOT NULL, -- Số hàng
    map_vehicle_seat_column_no INT NOT NULL, -- Số cột
    map_vehicle_seat_floor_no INT NOT NULL, -- Số tầng
    map_vehicle_seat_lock_chair TINYINT(1), -- Khóa ghế (TRUE nếu ghế bị khóa, FALSE nếu không bị khóa)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicles (Xe)
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_license_plate VARCHAR(255) NOT NULL, -- Biển số xe
    vehicle_model VARCHAR(50), -- Model của xe
    vehicle_brand VARCHAR(50), -- Hãng xe
    vehicle_capacity INT, -- Số chỗ ngồi
    vehicle_manufacture_year YEAR, -- Năm sản xuất
    vehicle_color VARCHAR(20), -- Màu sắc
    vehicle_description VARCHAR(255), -- Ghi chú thêm về xe
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		map_vehicle_seat_id INT, -- Khóa ngoại liên kết với bảng vehicle_types
		office_id INT, -- Khóa ngoại liên kết với bảng offices
		FOREIGN KEY (office_id) REFERENCES offices(office_id),
		FOREIGN KEY (map_vehicle_seat_id) REFERENCES map_vehicle_seats(map_vehicle_seat_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicle_images (Hình ảnh mô tả của xe)
CREATE TABLE vehicle_images (
    vehicle_image_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_image_url VARCHAR(255) NOT NULL, -- Đường dẫn hoặc URL của hình ảnh
    vehicle_image_description VARCHAR(255), -- Mô tả hình ảnh (nếu có)
		vehicle_id INT,  -- Khóa ngoại liên kết với bảng vehicles
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng ways (Lộ trình chi tiết)
CREATE TABLE ways (
    way_id INT AUTO_INCREMENT PRIMARY KEY,
    way_name VARCHAR(255), -- Tên lộ trình chi tiết
    way_description VARCHAR(255), -- Ghi chú cho lộ trình
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng routes (Tuyến xe)
CREATE TABLE routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(255), -- Tên tuyến đường
		route_duration BIGINT, -- Thời gian Tuyến xe tính bằng phút
    route_distance BIGINT, -- Khoảng cách Tuyến xe tính bằng km
		route_url_gps TEXT, -- https://www.google.com/maps/dir/?api=1&origin=10.762622,106.660172&destination=10.776889,106.700806
    origin_office_id INT, -- Sử dụng trực tiếp office_id
    destination_office_id INT,  -- Sử dụng trực tiếp office_id
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		way_id INT, -- ID lộ trình chi tiết
		FOREIGN KEY (way_id) REFERENCES ways(way_id), -- Liên kết với bảng ways
    FOREIGN KEY (origin_office_id) REFERENCES offices(office_id), 
    FOREIGN KEY (destination_office_id) REFERENCES offices(office_id) 
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng pickup_points (Điểm đón)
CREATE TABLE pickup_points (
		pickup_point_way_id INT NOT NULL, -- ID chuyến đi
    pickup_point_office_id INT,
    pickup_point_name VARCHAR(255), -- Tên điểm đón
    pickup_point_time INT, -- Thời gian đón (phút so với giờ khởi hành)
    pickup_point_kind INT, -- Loại điểm đón
    pickup_point_description VARCHAR(255), -- Ghi chú
    point_kind_name VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (pickup_point_office_id, pickup_point_way_id),
    FOREIGN KEY (pickup_point_way_id) REFERENCES ways(way_id), -- Liên kết với bảng ways
    FOREIGN KEY (pickup_point_office_id) REFERENCES offices(office_id) -- Liên kết với bảng offices
);

-- Bảng employee_types (Loại nhân viên)
CREATE TABLE employee_types (
    employee_type_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_type_name VARCHAR(255) NOT NULL, -- Tên loại nhân viên (Ví dụ: Quản lý, Nhân viên bán vé, Tài xế, v.v.)
		employee_type_description VARCHAR(255)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng employees (Nhân viên)
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_full_name VARCHAR(255) NOT NULL,
    employee_email VARCHAR(255),
    employee_phone VARCHAR(20),
    employee_username VARCHAR(255) NOT NULL,
    employee_password VARCHAR(255) NOT NULL,
    employee_profile_image VARCHAR(255), -- Hình ảnh của nhân viên
    is_disabled TINYINT(1) DEFAULT 0,
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    last_refresh_token TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		office_id INT, 
    employee_type_id INT, -- Khóa ngoại liên kết với bảng employee_types
    FOREIGN KEY (employee_type_id) REFERENCES employee_types(employee_type_id),
		FOREIGN KEY (office_id) REFERENCES offices(office_id) 
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng drivers (Tài xế)
CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_license_number VARCHAR(50) NOT NULL, -- Số giấy phép lái xe
    driver_experience_years INT, -- Số năm kinh nghiệm
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		employee_id INT NOT NULL UNIQUE, -- Khóa ngoại liên kết với bảng employees
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) -- Khóa ngoại liên kết với bảng employees
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_arrival_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Giờ đến.
    trip_departure_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Giờ khởi hành.
		trip_date DATE DEFAULT CURRENT_DATE, -- Ngày đi.
    trip_price DECIMAL(10, 2), -- Giá vé đã tính vat và các chi phí có liên quan.
		trip_discount DECIMAL(10, 2), -- Phần trăm giảm giá, Giảm giá cho chuyến xe (Nếu có).
		trip_shuttle_enable TINYINT(1), -- Có hỗ trợ xe trung chuyển hay không ?
    allow_online_booking TINYINT(1), -- được phép đặt vé online hay không ?
		trip_holiday TINYINT(1), -- Chuyến xe là ngày lễ (Xử lý theo chính sách nếu có).
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		route_id INT, -- Xe thuộc tuyến xe nào (Xác định được văn phòng đến và văn phòng đi).
    vehicle_id INT NULL, -- Xe nào chạy chuyến này.
		map_vehicle_seat_id INT, -- Khóa ngoại liên kết với bảng vehicle_types
		FOREIGN KEY (map_vehicle_seat_id) REFERENCES map_vehicle_seats(map_vehicle_seat_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng trip_employees (Nhân viên làm việc trên mỗi chuyến xe)
CREATE TABLE trip_employees (
		trip_id INT NOT NULL,
    employee_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (trip_id, employee_id),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng reviews (Đánh giá)
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    review_rating INT DEFAULT 5, -- Số sao đánh giá (ví dụ: 1-5 sao)
		review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		review_status  VARCHAR(255),
    review_comment TEXT, -- Nội dung bình luận
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		route_id INT,
		customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng review_images (Hình ảnh trong đánh giá)
CREATE TABLE review_images (
    review_image_id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    review_image_url VARCHAR(255) NOT NULL, -- URL của hình ảnh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng booking_seats (booking_seats)
CREATE TABLE booking_seats (
    booking_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    map_vehicle_seat_id INT,
    booking_seat_status TINYINT(1), -- (0 là chưa đặt, 1 là đã đặt).
		booked_until TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
		booking_session TEXT,
    seat_status VARCHAR(255) NOT NULL DEFAULT 'available',
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (map_vehicle_seat_id) REFERENCES map_vehicle_seats(map_vehicle_seat_id),
    CHECK (seat_status IN ('locking', 'available'))
);

-- Bảng tickets (Vé)
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    booking_seat_id INT,
		ticket_name_chair VARCHAR(255),
		is_export_ticket TINYINT(1), -- Trạng thái In vé khi lên xe.
		is_cancellation TINYINT(1), -- Trạng thái hủy vé.
		ticket_amount DECIMAL NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (booking_seat_id) REFERENCES booking_seats(booking_seat_id) ON DELETE SET NULL,
		CHECK (is_cancellation IN (0, 1)),
		CHECK (is_export_ticket IN (0, 1)) 
);

-- ======================= THANH TOÁN BOOKING TICKETS ================================
CREATE TABLE payment_types (
    payment_type_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type_name VARCHAR(255) NOT NULL UNIQUE, -- Visa - Napas - Ví điện tử.
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE payment_methods (
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
		payment_method_code VARCHAR(255) NOT NULL UNIQUE,
    payment_method_name VARCHAR(255) NOT NULL UNIQUE,
		is_locked TINYINT(1),
		last_lock_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method_description TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		payment_type_id INT,
		FOREIGN KEY (payment_type_id) REFERENCES payment_types(payment_type_id)
);

CREATE TABLE payment_configs (
    payment_config_id INT AUTO_INCREMENT PRIMARY KEY,
		api_key TEXT,
		secret_key TEXT,
    public_key TEXT,
		webhook_url TEXT,
		payment_endpoint_url TEXT,
		currency_code TEXT,
		transaction_timeout TEXT,
		environment TEXT,
		merchant_id TEXT,
		refund_url TEXT,
		is_deleted TINYINT(1),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		payment_method_id INT,
		FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id)
);

CREATE TABLE booking_tickets (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
		booking_code VARCHAR(255) NOT NULL UNIQUE,
		--
    booking_status VARCHAR(255) NOT NULL DEFAULT 'pending', -- Trạng thái booking.
		booking_channel VARCHAR(255), -- web_chanel, mobile, offline, online.
		booking_number_of_ticket INT, -- Số lượng vé đã đặt.
		booking_total_price DECIMAL, --  Tổng tiền.
		booking_total_update_price DECIMAL, -- Tổng tiền khi có sự thay đổi vé/ghế.
		booking_time_expired_payment TIMESTAMP NOT NULL, -- Thời gian tối đa chấp nhận thanh toán.
		booking_note VARCHAR(255),
		booking_session TEXT,
		--
		customer_id INT NOT NULL,
		--
		office_pickup_id INT, -- Điểm đón khách hàng tại văn phòng.
    office_dropoff_id INT, -- Điểm trả khách hàng.
		--
    transfer_point_name INT, -- Trung chuyển điểm đón.
    return_point_name INT, -- Trung chuyển điểm trả.
		--
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		--
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
		FOREIGN KEY (office_pickup_id) REFERENCES offices(office_id), 
		FOREIGN KEY (office_dropoff_id) REFERENCES offices(office_id) 
    CHECK (booking_status IN ('pending', 'confirmed', 'cancelled'))
		-- 
);

CREATE TABLE booking_ticket_details (
    booking_id INT NOT NULL,
    ticket_id INT NOT NULL,
		original_price DECIMAL NOT NULL, -- Giá vé ban đầu
    new_price DECIMAL NULL, -- Giá vé sau khi cập nhật (có thể NULL nếu chưa cập nhật)
    price_difference DECIMAL GENERATED ALWAYS AS (new_price - original_price) STORED, -- Chênh lệch giá
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(255) NOT NULL DEFAULT 'pending',
    payment_reference_code VARCHAR(255) NOT NULL UNIQUE, -- Mã giao dịch bên Thứ ba.
    payment_amount DECIMAL(10, 2) NOT NULL, --  Số tiền thanh toán.
		payment_additional_description VARCHAR(255), -- Thanh toán mới hoặc thanh toán phụ thu thêm (Lý do chuyển đổi chuyến).
		payment_type VARCHAR(50) DEFAULT 'main' CHECK (payment_type IN ('main', 'additional')), -- Phân loại thanh toán là chính hay phụ thu thêm.
		booking_id INT NOT NULL,
    method_id INT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id),
    CHECK (payment_status IN ('pending', 'completed', 'failed'))
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;


CREATE TABLE refunds (
    refund_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT, -- Khóa ngoại liên kết với bảng tickets
    refund_amount DECIMAL NOT NULL, -- Số tiền hoàn lại
		refund_description VARCHAR(255), -- Mô tả hoàn vì lý do gì. (Do hủy, Do thay đổi vé được hoàn lại).
    refund_percentage DECIMAL(5, 2) NOT NULL, -- Tỷ lệ hoàn tiền (tính theo %)
    employee_id INT, -- Khóa ngoại liên kết với bảng employees
    office_id INT, -- Khóa ngoại liên kết với bảng offices
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    refunded_at TIMESTAMP NULL, -- Ngày giờ hoàn tiền
    is_refunded TINYINT(1) DEFAULT 0, -- Trạng thái đã hoàn lại chưa (0: chưa hoàn, 1: đã hoàn)
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (office_id) REFERENCES offices(office_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;



-- ========================= CÁC NGHIỆP VỤ TIN TỨC ĐĂNG BÀI ===================================


-- Bảng article_types (Loại tin tức)
CREATE TABLE article_types (
    article_type_id INT AUTO_INCREMENT PRIMARY KEY,
    article_title VARCHAR(255) NOT NULL,
    article_field VARCHAR(255) NOT NULL,
    is_highlight TINYINT(1),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    publishedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng articles (Tin tức)
CREATE TABLE articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    article_title VARCHAR(255) NOT NULL,
    article_description TEXT,
    article_content TEXT NOT NULL,
		article_order TINYINT(1),
    article_slug TEXT NOT NULL UNIQUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_priority TINYINT(1),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    type_id INT NOT NULL,
		employee_id INT NOT NULL,
    FOREIGN KEY (thumbnail_img_id) REFERENCES images(image_id),
		FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    FOREIGN KEY (type_id) REFERENCES article_types(type_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

CREATE TABLE article_tags (
    article_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;




-- ================= VOUCHER ÁP DỤNG ===================



CREATE TABLE vouchers (
    voucher_id INT AUTO_INCREMENT PRIMARY KEY,
    voucher_code VARCHAR(255) NOT NULL UNIQUE, -- Mã voucher (ví dụ: GIAMGIA)
    voucher_discount_percentage DECIMAL(5, 2) NOT NULL, -- Tỷ lệ giảm giá (ví dụ: 15.00 cho 15%)
    voucher_discount_max_amount DECIMAL(10, 2) NOT NULL, -- Số tiền giảm giá tối đa (ví dụ: 150000)
		voucher_usage_limit INT NOT NULL DEFAULT 1,
    voucher_valid_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời gian bắt đầu hiệu lực
    voucher_valid_to TIMESTAMP NOT NULL, -- Thời gian kết thúc hiệu lực (ví dụ: 30-09-2024)
		voucher_created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (voucher_created_by) REFERENCES customers(customer_id)
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;






-- ================= PHÂN QUYỀN HỆ THỐNG VÀ GHI LOGS HOẠT ĐỘNG ĐỐI VỚI NHÂN VIÊN =====================

-- Bảng roles (Quyền)
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
		role_description VARCHAR(50) NOT NULL
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Bảng menus (Quyền)
CREATE TABLE menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(50) NOT NULL,
		menu_path_url VARCHAR(50) NOT NULL
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Bảng role_menus (Nhóm quyền)
CREATE TABLE role_menus (
    role_id INT,
    menu_id INT,
		PRIMARY KEY (role_id, menu_id),
		FOREIGN KEY (role_id) REFERENCES roles(role_id),
		FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

-- Bảng role_employees (Quyền )
CREATE TABLE role_employees (
    role_id INT,
    employee_id INT,
		PRIMARY KEY (role_id, employee_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
		FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Bảng audit_logs (Log hoạt động)
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    action VARCHAR(255) NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_device VARCHAR(255), -- Loại thiết bị truy cập (Desktop, Mobile, Tablet, etc.)
    location VARCHAR(255), -- Vị trí địa lý
    ip_address VARCHAR(45), -- Địa chỉ IP
    browser_info VARCHAR(255), -- Thông tin về trình duyệt (User Agent)
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);