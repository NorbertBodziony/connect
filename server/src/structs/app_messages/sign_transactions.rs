use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::structs::common::{SignedTransaction, TransactionToSign};

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SignTransactionsRequest {
    #[serde(rename = "responseId")]
    pub response_id: String,
    pub transactions: Vec<TransactionToSign>,
    #[ts(optional)]
    pub metadata: Option<String>,
}
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SignTransactionsResponse {
    #[serde(rename = "responseId")]
    pub response_id: String,
    pub signed_transactions: Vec<SignedTransaction>,
    #[ts(optional)]
    pub metadata: Option<String>,
}
