import React from "react";

function NotFoundComponent() {
  return (
    <div style={{ background: "#ffffff", paddingTop: 100 }}>
      <div style={{ color: "#0084ff", textAlign: "center", fontSize: 15 }}>
        Không tìm thấy trang!
      </div>
      <div style={{ textAlign: "center", margin: 20 }}>
        <img src={`/images/notfoundimg.png`} alt="not-found" />
      </div>
      <div style={{ textAlign: "center", fontSize: 15 }}>
        Chúng tôi rất tiếc vì không tìm thấy trang web bạn truy cập.
      </div>
    </div>
  );
}

export default NotFoundComponent;
