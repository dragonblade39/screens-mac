import React, { useState, useEffect, useRef } from "react";
import "./Screen1.css";
import data from "../data.json";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const Screen1 = () => {
  const [treeData, setTreeData] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNode, setSelectedNode] = useState(null); // State to hold selected node name
  const [selectedOption, setSelectedOption] = useState(null); // State to hold selected option from the container
  const navbarRef = useRef(null);

  useEffect(() => {
    setTreeData(data);
  }, []);

  const handleToggle = (label) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleDoubleClick = (label) => {
    setSelectedNode(label); // Set the selected node when double-clicked
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option when clicked
  };

  const renderTree = (nodes, level = 0) => (
    <div key={nodes.label} className={`tree-node level-${level}`}>
      <div className="node-header node-label">
        {nodes.children && (
          <span className="arrow" onClick={() => handleToggle(nodes.label)}>
            &nbsp;
            {expandedNodes[nodes.label] ? (
              <i className="bi bi-arrow-down-circle-fill"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </span>
        )}
        <span
          className={` ${expandedNodes[nodes.label] ? "bold" : ""}`}
          onDoubleClick={() => handleDoubleClick(nodes.label)}
        >
          &nbsp;{nodes.label}
        </span>
      </div>
      {nodes.children && expandedNodes[nodes.label] && (
        <div className="node-children">
          {nodes.children.map((child) => renderTree(child, level + 1))}
        </div>
      )}
    </div>
  );

  const optionsGroup1 = [
    "Security Options",
    "Control and I/O Network",
    "Server History",
    "Server Displays",
    "Control Confirmation",
    "QVCS",
    "Identification",
  ];

  const optionsGroup2 = [
    "System Time",
    "Statistics",
    "Peer Connections",
    "Hardware Information",
    "FTE",
    "UDP/TCP",
    "IP/ICMP",
    "Soft Failures",
    "PDA Statistics",
  ];

  return (
    <div>
      <div className="left-navbar" ref={navbarRef}>
        {treeData.map((node) => renderTree(node))}
      </div>
      <div className="content">
        <h1>Static Page Content</h1>
        <p>This is a static page with a tree-structured navbar on the left.</p>
      </div>

      {selectedNode && (
        <div className="selected-container">
          <div className="options-container">
            {optionsGroup1.concat(optionsGroup2).map((option) => (
              <div
                key={option}
                className={`option ${
                  selectedOption === option ? "selected-option" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Screen1;
