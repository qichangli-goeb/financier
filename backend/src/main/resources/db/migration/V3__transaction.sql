CREATE TABLE transaction
(
    id                           INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description                  TEXT NOT NULL,
    valueDate                    DATE NOT NULL,

    otherPartyName               TEXT NOT NULL,
    otherPartyIban               TEXT NOT NULL,

    myIban                       TEXT NOT NULL,

    amountcents                  INT  NOT NULL,
    currency                     TEXT NOT NULL,
    balanceAfterTransactioncents INT  NOT NULL
);
