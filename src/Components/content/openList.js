import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
const OpenList = () => {
  return (
    <div>
      <div className="openListInformationContainer">
        <img src={example2}></img>
        <div>
          <div className="openListLikeButton">
            <h2 className="openListLikeButtonHeart">♡</h2>{" "}
            <h6 className="openListLikeButtonAmount">172</h6>
          </div>
          <h2 className="openListTitle">▶︎ Constantinople fell</h2>
          <h2 className="openListDescription">
            {" "}
            Constantinople developed into a thriving port thanks to its prime
            geographic location between Europe and Asia and its natural harbor.
          </h2>{" "}
          <h2 className="openListData">12/12/2024 - Foxhopper - Public</h2>
        </div>
      </div>
      <div className="openListLinksContainer">
        <table id="table">
          <thead>
            <tr>
              <th onclick="sortTable(0)">Category</th>
              <th onclick="sortTable(1)">Link Content</th>
              <th onclick="sortTable(2)">Type</th>
              <th onclick="sortTable(3)">Date</th>
            </tr>
          </thead>
          <tbody className="listTableBody">
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
      </div>
    </div>
  );
};

export default OpenList;
