import { useState } from "react";
import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
import example1 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/34ca39ba71e3440bb6196601075e53f5.jpg";

const OpenList = () => {
  const [creatingComment, setCreatingComment] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [editingList, setEditingList] = useState(false);
  return (
    <div className="openListContainer">
      <div>
        {editingList ? (
          <div className="openListEditListContainer">
            <div className="openListEditListImageContainer">
              <img className="openListEditListImage" src={example2}></img>
              <div class="openListEditListImageOverlayTextContainer">
                <p class="openListEditListImageOverlayText">Change Image</p>
              </div>
            </div>
            <div className="openListEditListOptionConainer">
              <div className="openListEditInputContainer">
                <div className="openListEditInputName">List Name</div>
                <input className="openListEditInput"></input>
              </div>
              <div className="openListEditDescriptionInputContainer">
                {" "}
                <div className="openListEditInputDescriptionName">
                  List Description
                </div>
                <textarea className="openListEditDescriptionInput"></textarea>
              </div>

              <div className="openListEditButtonContainer">
                <div className="openListEditSelectedButton">Private</div>
                <div className="openListEditUnselectedButton">Public</div>
              </div>
              <div className="openListEditButtonContainer">
                <div className="openListEditDeleteButton">Delete</div>
                <div
                  className="openListEditDoneButton"
                  onClick={() => {
                    setEditingList(false);
                  }}
                >
                  Done
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="openListInformationContainer">
            <div className="openListImageContainer">
              {" "}
              <img src={example2}></img>
            </div>

            <div className="openListInformationTextButtonContainer">
              <div className="openListInformationTextContainer">
                <div className="openListTitleLikesContainer">
                  <h2 className="openListTitle">▶︎ Constantinople fell</h2>
                  <h2 className="openListLikesText">♡ 120</h2>
                </div>
                <h2 className="openListDescription">
                  {" "}
                  Constantinople developed into a thriving port thanks to its
                  prime geographic location between Europe and Asia and its
                  natural harbor.
                </h2>{" "}
                <h2 className="openListData">
                  12-12-2024 - Foxhopper - Public
                </h2>
              </div>
              <div className="opemListInteractiveContainer">
                {" "}
                <div className="openListInteractiveButton"> Share</div>
                <div className="openListInteractiveButton"> ♡ </div>{" "}
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
              <th onclick="sortTable(0)">Title</th>
              <th onclick="sortTable(1)">Author</th>
              <th onclick="sortTable(2)">Type</th>
              <th onclick="sortTable(3)">Date</th>
            </tr>
          </thead>

          <tbody className="listTableBody">
            {" "}
            {addingLink && (
              <div className="addLinkContainer">
                <input className="addLinkInput"></input>
                <div className="addLinkButton">Add Link</div>
              </div>
            )}
            <tr>
              <td>Humans</td>
              <td>
                <a>Clams Casino</a>
              </td>
              <td>Music</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Humans</td>
              <td>
                <a>Clams Casino</a>
              </td>
              <td>Video</td>
              <td>2024-02-02</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>{" "}
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 1</a>
              </td>
              <td>Type A</td>
              <td>2024-04-01</td>
            </tr>
            <tr>
              <td>Category 2</td>
              <td>
                <a href="#">Link 2</a>
              </td>
              <td>Type B</td>
              <td>2024-04-15</td>
            </tr>
            <tr>
              <td>Category 1</td>
              <td>
                <a href="#">Link 3</a>
              </td>
              <td>Type C</td>
              <td>2024-04-20</td>
            </tr>
            <tr>
              <td>Category 3</td>
              <td>
                <a href="#">Link 4</a>
              </td>
              <td>Type A</td>
              <td>2024-04-25</td>
            </tr>
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
            <textarea className="createCommentinput"></textarea>
            <div className="createCommentButton">Post comment</div>
          </div>
        )}

        <div className="commentsContainer">
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>{" "}
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>{" "}
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>{" "}
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>{" "}
          <div className="individualCommentContainer">
            <h2 className="commentUsernameText">Brian</h2>
            <h2 className="commentText">This list is hittin the spot brah.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenList;
