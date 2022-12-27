function Tweet({ _id, tweet }) {
    return (
      <tr>
                  <td>{_id}</td>
                  <td>{tweet}</td>
                </tr>
    );
}

export default Tweet;