import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, Autoplay,
} from 'swiper';
import RoomItem from '../components/RoomItem';
import NavPanel from '../components/NavPanel';
import { getRooms } from '../redux/rooms/rooms';
import lunar from '../images/lunar.png';
import 'swiper/css';

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

const Home = () => {
  const rooms = useSelector((state) => state.roomsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="Container">
        <div className="p-2 vis">
          <FontAwesomeIcon icon={faBars} onClick={handleShow} />
        </div>
        <div className="home">
          <div className="nav pt-10">
            <img src={lunar} className="lunar-logo" alt="Premium Hotel Logo" />
            <NavPanel />
          </div>
          <div className="main">
            <h1>Premium&apos;s rooms</h1>
            {rooms.length === 0 ? (
              <h2>Please create a room</h2>
            ) : (
              <h2>Please select a room for reservation</h2>
            )}
            <div className="rooms">
              <Swiper
                spaceBetween={1}
                slidesPerView={2}
                autoplay
                loop
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  700: {
                    spaceBetween: 100,
                    slidesPerView: 3,
                  },
                  500: {
                    spaceBetween: 100,
                    slidesPerView: 2,
                  },
                  411: {
                    spaceBetween: 100,
                    slidesPerView: 2,
                  },
                  300: {
                    spaceBetween: 0,
                    slidesPerView: 1,
                  },
                }}
              >
                {Array.isArray(rooms)
                  && rooms.map((room) => (
                    <SwiperSlide key={room.id}>
                      <RoomItem room={room} key={room.id} rooms={rooms} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas className="darkened-off" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={lunar} className="lunar-logo" alt="Premium Hotel Logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavPanel className="text-black" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Home;
