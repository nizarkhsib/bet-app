exports.allAccess = (req, res) => {
  res.status(200).send(
    [
      {
        "id": 1,
        "firstname": "nizar",
        "lastname": "khsib"
      },
      {
        "id": 2,
        "firstname": "Ryadh",
        "lastname": "Khsib"
      }
    ]
  );
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
