--배송정보 담기
INSERT INTO delivery (receiver, address, contact) VALUES ("김송아", "서울시 중구", "010-1234-5678");
INSERT INTO delivery (receiver, address, contact) VALUES ("김송송", "서울시 서초구", "010-4425-1254");
const delivery_id = SELECT max(id) FROM delivery

-- 주문 정보 입력
INSERT INTO orders (user_id, delivery_id, main_book, total_quantity, total_price) VALUES ('1', '1', '코딩의 첫 걸음', '3', '72000');
const order_id = SELECT max(id) FROM orders

-- 주문 상세 목록 입력
INSERT INTO orderedProduct (product_id, order_id, quantity) VALUES 
('1', '1', '1'), ('3', '1', '2');

-- 주문 내역 조회
SELECT created_at,address,receiver,contact,main_book,total_price,total_quantity FROM orders 
LEFT JOIN delivery ON delivery.id=orders.delivery_id
WHERE user_id=4;