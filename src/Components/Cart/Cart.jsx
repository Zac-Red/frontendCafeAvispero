import { useEffect, useState } from "react";
import { CartElement } from "../CartElement/CartElement"
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';

export const Cart = ({ title, process, persone, total, data = [],
  cancelProcess, acceptProcess, incrementElement, decrementElement, deleted }) => {

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1660);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [expandSideCart, setExpandSideCart] = useState(false);

  const handleSideCart = () => {
    setExpandSideCart(!expandSideCart)
  }

  return (
    <>
      {isMobile ?
        <>
          <div className="navshowcart">
            <button className="btnCart" onClick={handleSideCart}>
              <ShoppingCartIcon/>
              carrito
            </button>
          </div>
          <Drawer
            anchor={"right"}
            open={expandSideCart}
            onClose={handleSideCart}
            PaperProps={{
              sx: {
                backgroundColor: "#E3D7BF",
                borderRadius: "15px",
                width: "300px"
              }}}>
            <div className="CartContainer">
              <Typography variant="h4">{title}</Typography>
              <Typography variant="h5">{persone} {process}</Typography>
              {data.length === 0 ?
                <>
                  <div className="CartEmpty">
                    <Typography variant="h5" gutterBottom>
                      Detalle vació
                    </Typography>
                  </div>
                  <button onClick={() => cancelProcess()} className="btnCancelProcess">Cancelar</button>
                </>
                :
                <>
                  <CartElement
                    data={data}
                    increment={incrementElement}
                    decrement={decrementElement}
                    deleted={deleted} />
                  {total &&
                    <Typography variant="h4" gutterBottom>
                      Total:
                      Q.{total}
                    </Typography>}
                  <div className="ActionsProcess">
                    <button onClick={() => cancelProcess()} className="btnCancelProcess">Cancelar</button>
                    <button onClick={() => acceptProcess()} className="btnAcceptProcess">Aceptar</button>
                  </div>
                </>
              }
            </div>
          </Drawer>
        </>
        :
        <div className="CartContainer">
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h5">{persone} {process}</Typography>
          {data.length === 0 ?
            <>
              <div className="CartEmpty">
                <Typography variant="h5" gutterBottom>
                  Detalle vació
                </Typography>
              </div>
              <button onClick={() => cancelProcess()} className="btnCancelProcess">Cancelar</button>
            </>
            :
            <>
              <CartElement
                data={data}
                increment={incrementElement}
                decrement={decrementElement}
                deleted={deleted} />
              {total &&
                <Typography variant="h4" gutterBottom>
                  Total:
                  Q.{total}
                </Typography>}
              <div className="ActionsProcess">
                <button onClick={() => cancelProcess()} className="btnCancelProcess">Cancelar</button>
                <button onClick={() => acceptProcess()} className="btnAcceptProcess">Aceptar</button>
              </div>
            </>
          }
        </div>
      }
    </>
  )
}
