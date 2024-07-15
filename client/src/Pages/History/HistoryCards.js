import React from "react";

import "./History.css";
import { IconButton, InputBase } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DateComponent from "../../component/DateSelection/DateComponent";

const HistoryCards = () => {
  return (
    <div className="history-cards">
      <div className="history-header">
        {/* <h3>History : 2024</h3> */}
        <DateComponent/>
        <div className="history-search">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search History"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="cards">
      <div className="card-section" style={{ background: "#f3e7e7" }}>
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/ios/50/40C057/january.png"
          alt="january"
        />
      </div>

      <div className="card-section" style={{ background: "#efebf4" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/february.png"
            alt="february"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#faf1f2" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/march.png"
            alt="march"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f0f3f3" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/april.png"
            alt="april"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f1eff7" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/may.png"
            alt="may"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f6f7e8" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/june.png"
            alt="june"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f4edf6" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/july.png"
            alt="july"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#e5f3f1" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/august.png"
            alt="august"
          />
        </div>
      </div>
      <div className="card-section" style={{ background: "#faf1f2" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/september.png"
            alt="sept"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f0f3f3" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/october.png"
            alt="oct"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f1eff7" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/november.png"
            alt="nov"
          />
        </div>
      </div>

      <div className="card-section" style={{ background: "#f6f7e8" }}>
        <div className="card-numberData">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/50/737373/december.png"
            alt="dec"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default HistoryCards;
