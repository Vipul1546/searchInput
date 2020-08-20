import React from "react";

const HighlightDropdown = (props) => {
  const renderName = (name) => {
    var splitPattern =
      props.searchTerm != null
        ? new RegExp("(" + props.searchTerm + ")", "gi")
        : "";

    var splitWords = name.split(splitPattern);

    var html = [];
    splitWords.forEach((splitWord, index) => {
      if (
        props.searchTerm != null &&
        splitWord.toLowerCase() === props.searchTerm.toLowerCase()
      ) {
        html.push(
          <span key={index} className="bold">
            {splitWord}
          </span>
        );
      } else {
        html.push(<span key={index}>{splitWord}</span>);
      }
    });

    return <span> {html}</span>;
  };

  const { item, searchTerm } = props;
  return (
    <React.Fragment>
      {item ? (
        <div className="card" key={item.id}>
          <p className="topBox">
            {renderName(item.id)}
            <br />
            <small>{renderName(item.name)}</small>
          </p>
          {item.items.some(function (v) {
            return v.toLowerCase().indexOf(searchTerm) >= 0;
          }) ? (
            <span className="items">"{searchTerm}" found in items</span>
          ) : (
            ""
          )}
          <p>{renderName(item.address)}</p>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default HighlightDropdown;
