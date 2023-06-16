import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import assets from "../../assets";
import { instance } from "../../axios/axiosConfig";
import { Navbar, PostCard } from "../../components";
import useDataContext from "../../hooks/useDataContext";

export default function HomePage() {
  const [publicationsData, setPublicationsData] = useState([]);
  const [showPublications, setShowPublications] = useState([]);
  const { setLoader } = useDataContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    resetCategories();
  }, []);
  useEffect(() => {
    instance.get("categories/all").then((res) => setCategories(res.data));
  }, []);

  const filterCategory = (id) => {
    setLoader(true);
    const mostrar = publicationsData.filter((c) => c.category === id);
    setShowPublications(mostrar);
    setTimeout(() => setLoader(false), 500);
  };

  const resetCategories = () => {
    setLoader(true);
    instance.get("users/publications/all").then((res) => {
      setPublicationsData(res.data);
      setShowPublications(res.data);
    });
    setTimeout(() => setLoader(false), 500);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <Row style={{ width: "100%" }} className="m-0">
        <Col lg={3} className="m-0 p-0">
          <ListGroup className=" m-auto mx-5 px-3 ">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Categorias</Accordion.Header>
                <Accordion.Body className="d-flex flex-column gap-3">
                  <span style={{ cursor: "pointer" }} onClick={resetCategories}>
                    Todas
                  </span>
                  {categories.map((category) => (
                    <span
                      key={category.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => filterCategory(category.id)}
                    >
                      {category.title}
                    </span>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup>
        </Col>
        <Col className="p-0">
          <div className="w-100 p-3 py-5 container py-sm-3 pb-sm-5 flex-sm-column align-items-center">
            {showPublications.length !== 0 ? (
              showPublications.map((publication, i) => {
                return <PostCard data={publication} key={i + 1} />;
              })
            ) : (
              <span>
                <img
                  src={assets.LoaderPost.img}
                  alt={assets.LoaderPost.info}
                  className="img-fluid"
                />
              </span>
            )}
          </div>
        </Col>
      </Row>
    </motion.section>
  );
}
