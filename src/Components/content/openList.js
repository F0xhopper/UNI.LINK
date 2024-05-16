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
      console.log(list._id);
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
      console.log(`http://localhost:3013/lists/${list._id}/links`);
      if (!response.ok) {
        throw new Error("Failed to add link to the list");
      }

      const responseData = await response.json();
      console.log("Link added:", responseData.message);
      setAddingLink(false);
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
  const editListInputsInsert = () => {
    setListNameInput(list.list_name);
    setListDescriptionInput(list.list_description);
    setImageDataUrl(list.image);
  };
  const editList = async () => {
    if (!props.creatingList) {
      try {
        console.log("editing");
        const response = await fetch(
          `http://localhost:3013/lists/${list._id}/edit`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: listNameInput,
              description: listDescriptionInput,
              image: imageDataUrl,
              public: listPublic,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update list details");
        }

        // Reset form fields and display success message
      } catch (error) {}
    }
  };

  const deleteList = async (listId) => {
    try {
      const response = await fetch(
        `http://localhost:3013/lists/${list._id}/delete`,
        {
          method: "DELETE",
        }
      );
      props.setListOpen();
      if (!response.ok) {
        throw new Error("Failed to delete list");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteLink = async (linkUrl) => {
    try {
      console.log(linkUrl, list._id);
      const response = await fetch(
        `http://localhost:3013/lists/${list._id}/links/${encodeURIComponent(
          linkUrl
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      // Optionally, update the UI to reflect the deletion
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete link. Please try again.");
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
      setCreatingComment(false);
      console.log("Comment added:", responseData.message);
      // Optionally, update the state to reflect the changes
    } catch (error) {
      console.error("Error adding comment to the list:", error);
      alert("Failed to add comment to the list. Please try again.");
    }
  };
  const createList = async (event) => {
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
            list_public: listPublic,
            image: imageDataUrl,
            created_at: new Date().toISOString().slice(0, 10),
            comments: [],
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
  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3013/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return userData.username;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return ""; // Return empty string if user data fetching fails
    }
  };
  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3013/list/${props.listOpen}`
        ); // Change the URL according to your backend API
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        let data = await response.json();
        if (data.comments.length > 0) {
          const commentsWithUsername = await Promise.all(
            data.comments.map(async (comment) => {
              try {
                const username = await fetchUserName(comment.user);
                // Return the comment object with username added
                return { ...comment, username: username }; // or simply { ...comment, username }
              } catch (error) {
                console.error("Error fetching username:", error);
                // If fetching username fails, return the comment without modifying
                return comment;
              }
            })
          );
          data.comments = commentsWithUsername;
        }
        setList(data); // Assuming the response contains an array of lists
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
              <div
                class="openListEditListImageOverlayTextContainer"
                style={{
                  opacity: props.creatingList && imageDataUrl == "" && "1",
                }}
              >
                <label
                  htmlFor="listImage"
                  className="openListEditListImageOverlayText"
                >
                  {props.creatingList ? "Add Image" : "Change Image"}
                  <input
                    className="openListEditListImageInput"
                    id="listImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Handle image upload
                  />
                </label>
              </div>
            </div>
            <div className="openListEditListOptionConainer">
              <div className="openListEditInputContainer">
                <div className="openListEditInputName">List Name</div>
                <input
                  className="openListEditInput"
                  value={listNameInput}
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
                  value={listDescriptionInput}
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
                <div className="openListEditDeleteButton" onClick={deleteList}>
                  Delete
                </div>
                <div
                  className="openListEditDoneButton"
                  onClick={() => {
                    editList();
                    setEditingList(false);
                    createList();
                  }}
                >
                  {props.creatingList ? "Create List" : "Done"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="openListInformationContainer">
            {list.image && (
              <div className="openListImageContainer">
                {" "}
                <img src={list.image}></img>
              </div>
            )}

            <div className="openListInformationTextButtonContainer">
              <div className="openListInformationTextContainer">
                <div className="openListTitleLikesContainer">
                  <h2 className="openListTitle">▶︎ {list.list_name}</h2>
                  <h2 className="openListLikesText">♡ {list.likes.length}</h2>
                </div>
                <div className="openListDescriptionContainer">
                  {" "}
                  <h2 className="openListDescription">
                    {" "}
                    {list.list_description}
                  </h2>
                </div>

                <h2 className="openListData">
                  {list.created_at} - Foxhopper -{" "}
                  {list.list_public ? "Public" : "Private"}
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
                {list.userId == localStorage.getItem("userId") && (
                  <div
                    className="openListInteractiveButton"
                    onClick={() => {
                      setEditingList(true);
                      editListInputsInsert();
                    }}
                  >
                    ✎ Edit
                  </div>
                )}
                {list.userId == localStorage.getItem("userId") && (
                  <div
                    className="openListInteractiveButtonLast"
                    onClick={() => {
                      setAddingLink(!addingLink);
                    }}
                  >
                    + Add Link
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="openListLinksContainer">
        <table id="table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Source</th>
              <th>Type</th>
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
                let part1, part2;
                let contentType = "";
                if (link.link_url.includes("youtube")) {
                  contentType = "Video";
                } else if (
                  link.link_url.includes("soundcloud") ||
                  link.link_url.includes("spotify") ||
                  link.link_url.includes("YouTube")
                ) {
                  contentType = "Song";
                } else if (
                  link.link_url.includes("ebay") ||
                  link.link_url.includes("amazon")
                ) {
                  contentType = "Item";
                } else {
                  contentType = "Informative";
                }
                if (link.link_name.includes("-")) {
                  part1 = link.link_name.substring(
                    0,
                    link.link_name.lastIndexOf("-")
                  );
                  part2 = link.link_name.substring(
                    link.link_name.lastIndexOf("-") + 1
                  );
                } else if (link.link_name.includes("|")) {
                  part1 = link.link_name.substring(
                    0,
                    link.link_name.lastIndexOf("|")
                  );
                  part2 = link.link_name.substring(
                    link.link_name.lastIndexOf("|") + 1
                  );
                } else if (link.link_name.includes(":")) {
                  part1 = link.link_name.substring(
                    0,
                    link.link_name.lastIndexOf(":")
                  );
                  part2 = link.link_name.substring(
                    link.link_name.lastIndexOf(":") + 1
                  );
                } else {
                  part1 = link.link_name;
                  part2 = "Internet";
                }

                return (
                  <a target="_blank" href={link.link_url}>
                    <td>{part1}</td>
                    <td>{part2}</td>
                    <td>{contentType}</td>
                    {editingList && (
                      <td
                        onClick={() => {
                          deleteLink(link.link_url);
                          console.log(link.link_url);
                        }}
                      >
                        Delete
                      </td>
                    )}
                  </a>
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
            {list.comments.length} comments
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

        <div className="commentsContainer">
          {" "}
          {list &&
            list.comments.map((comment) => {
              return (
                <div className="individualCommentContainer">
                  <h2 className="commentUsernameText">{comment.username}</h2>
                  <h2 className="commentText">{comment.comment}</h2>
                </div>
              );
            })}{" "}
        </div>
      </div>
    </div>
  );
};

export default OpenList;
