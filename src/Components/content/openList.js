import { useState, useEffect } from "react";
import cheerio from "cheerio";
import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
import example1 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/34ca39ba71e3440bb6196601075e53f5.jpg";

const OpenList = (props) => {
  const [creatingComment, setCreatingComment] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [editingList, setEditingList] = useState(false);
  const [listPublic, setListPublic] = useState(true);
  const [listNameInput, setListNameInput] = useState();
  const [listDescriptionInput, setListDescriptionInput] = useState();
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded image file
  const [imageDataUrl, setImageDataUrl] = useState(""); // State to hold the image data URL
  const [list, setList] = useState(null);
  const [addLinkInput, setAddLinkInput] = useState();
  const [commentInput, setCommentInput] = useState();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile(file);
      setImageDataUrl(reader.result); // Set the data URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const addLinkToList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3013/lists/${list._id}/links`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link_name: "Name of the Link", // Replace with actual values
            link_url: addLinkInput,
            platform: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add link to the list");
      }

      const responseData = await response.json();
      console.log("Link added:", responseData.message);
      // Optionally, update the state to reflect the changes
    } catch (error) {
      console.error("Error adding link to the list:", error);
      alert("Failed to add link to the list. Please try again.");
    }
  };
  const addLikeToList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3013/lists/${list._id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("userId") }), // Assuming username is sent in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add like to the list");
      }

      const responseData = await response.json();
      console.log("Like added:", responseData.message);
      // Optionally, update the state to reflect the changes
    } catch (error) {
      console.error("Error adding like to the list:", error);
      alert("Failed to add like to the list. Please try again.");
    }
  };
  const addCommentToList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3013/lists/${list._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: localStorage.getItem("userId"),
            comment: commentInput,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment to the list");
      }

      const responseData = await response.json();
      console.log("Comment added:", responseData.message);
      // Optionally, update the state to reflect the changes
    } catch (error) {
      console.error("Error adding comment to the list:", error);
      alert("Failed to add comment to the list. Please try again.");
    }
  };
  const handleSubmit = async (event) => {
    if (props.creatingList) {
      try {
        const response = await fetch("http://localhost:3013/lists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            list_name: listNameInput,
            list_description: listDescriptionInput,
            public: listPublic,
            image: imageDataUrl,
            created_at: new Date(),
            likes: [],
            links: [],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create list");
        }

        const responseData = await response.json();
        alert(responseData.message); // Show success message
        props.setCreatingList(false);
        props.setListOpen(responseData.listId);
        // Optionally, redirect to another page or perform any other action
      } catch (error) {
        console.error("Error creating list:", error);
        alert("Failed to create list. Please try again.");
      }
    }
  };
  useEffect(() => {
    const fetchListData = async () => {
      try {
        console.log(props.listOpen);
        const response = await fetch(
          `http://localhost:3013/list/${props.listOpen}`
        ); // Change the URL according to your backend API
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        const data = await response.json();
        setList(data); // Assuming the response contains an array of lists
        console.log(list);
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };

    fetchListData();
  });
  if (!list && !props.creatingList) {
    return <div>Loading...</div>; // Render loading indicator until data is fetched
  }
  return (
    <div className="openListContainer">
      <div>
        {editingList || props.creatingList ? (
          <div className="openListEditListContainer">
            <div className="openListEditListImageContainer">
              <img className="openListEditListImage" src={imageDataUrl}></img>
              <div class="openListEditListImageOverlayTextContainer">
                <p class="openListEditListImageOverlayText">
                  {" "}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Handle image upload
                  />{" "}
                  {props.creatingList ? "Add Image" : "Change Image"}
                </p>
              </div>
            </div>
            <div className="openListEditListOptionConainer">
              <div className="openListEditInputContainer">
                <div className="openListEditInputName">List Name</div>
                <input
                  className="openListEditInput"
                  onChange={(e) => {
                    setListNameInput(e.target.value);
                  }}
                ></input>
              </div>
              <div className="openListEditDescriptionInputContainer">
                {" "}
                <div className="openListEditInputDescriptionName">
                  List Description
                </div>
                <textarea
                  onChange={(e) => {
                    setListDescriptionInput(e.target.value);
                  }}
                  className="openListEditDescriptionInput"
                ></textarea>
              </div>

              <div className="openListEditButtonContainer">
                <div
                  className={
                    listPublic
                      ? "openListEditUnselectedButton"
                      : "openListEditSelectedButton"
                  }
                  onClick={() => {
                    setListPublic(!listPublic);
                    console.log(list);
                  }}
                >
                  Private
                </div>
                <div
                  className={
                    listPublic
                      ? "openListEditSelectedButton"
                      : "openListEditUnselectedButton"
                  }
                  onClick={() => {
                    setListPublic(!listPublic);
                  }}
                >
                  Public
                </div>
              </div>
              <div className="openListEditButtonContainer">
                <div className="openListEditDeleteButton">Delete</div>
                <div
                  className="openListEditDoneButton"
                  onClick={() => {
                    setEditingList(false);
                    handleSubmit();
                  }}
                >
                  {props.creatingList ? "Create List" : "Done"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="openListInformationContainer">
            <div className="openListImageContainer">
              {" "}
              <img src={list.image}></img>
            </div>

            <div className="openListInformationTextButtonContainer">
              <div className="openListInformationTextContainer">
                <div className="openListTitleLikesContainer">
                  <h2 className="openListTitle">▶︎ {list.list_name}</h2>
                  <h2 className="openListLikesText">♡ {list.likes.length}</h2>
                </div>
                <h2 className="openListDescription">
                  {" "}
                  {list.list_description}
                </h2>{" "}
                <h2 className="openListData">
                  {list.created_at} - Foxhopper -{" "}
                  {list.public ? "Public" : "Private"}
                </h2>
              </div>
              <div className="opemListInteractiveContainer">
                {" "}
                <div className="openListInteractiveButton"> Share</div>
                <div
                  className="openListInteractiveButton"
                  onClick={addLikeToList}
                >
                  {" "}
                  ♡{" "}
                </div>{" "}
                <div
                  className="openListInteractiveButton"
                  onClick={() => {
                    setCreatingComment(!creatingComment);
                  }}
                >
                  💬
                </div>
                <div
                  className="openListInteractiveButton"
                  onClick={() => {
                    setEditingList(true);
                  }}
                >
                  ✎ Edit
                </div>{" "}
                <div
                  className="openListInteractiveButtonLast"
                  onClick={() => {
                    setAddingLink(!addingLink);
                  }}
                >
                  + Add Link
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="openListLinksContainer">
        <table id="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="listTableBody">
            {" "}
            {addingLink && (
              <div className="addLinkContainer">
                <input
                  className="addLinkInput"
                  onChange={(e) => {
                    setAddLinkInput(e.target.value);
                  }}
                ></input>
                <div className="addLinkButton" onClick={addLinkToList}>
                  Add Link
                </div>
              </div>
            )}
            {list &&
              list.links.map((link) => {
                return (
                  <tr data-href={link.link_url}>
                    <td>{link.link_name}</td>
                    <td>{link.platform}</td>
                    <td>Video</td>
                    <td>2024-02-02</td>
                  </tr>
                );
              })}{" "}
          </tbody>
        </table>
      </div>{" "}
      <div className="openListComments">
        <div className="commentAmountContainer">
          <h2
            className="commentAmountText"
            onClick={() => {
              setCreatingComment(!creatingComment);
            }}
          >
            456 Comments
          </h2>
        </div>
        {creatingComment && (
          <div className="createCommentContainer">
            <textarea
              className="createCommentinput"
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            ></textarea>
            <div className="createCommentButton" onClick={addCommentToList}>
              Post comment
            </div>
          </div>
        )}
        {list &&
          list.links.map((link) => {
            return (
              <tr data-href={link.link_url}>
                <td>{link.link_name}</td>
                <td>{link.platform}</td>
                <td>Video</td>
                <td>2024-02-02</td>
              </tr>
            );
          })}{" "}
        <div className="commentsContainer">
          {" "}
          {list &&
            list.comments.map((comment) => {
              return (
                <div className="individualCommentContainer">
                  <h2 className="commentUsernameText">{comment.user}</h2>
                  <h2 className="commentText">{comment.comment}</h2>
                </div>
              );
            })}{" "}
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default OpenList;
