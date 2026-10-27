#!/usr/bin/env bash
# Fetch the audited sources from openai/math at the pinned commit and verify them.
set -euo pipefail
COMMIT=7ef5c0cc5ca4b0e072b7a050fca09ab24bc6fa3a
SRC_TREE_SHA=2321c93a95dcff6f70117eedec65ab637ac4d76bca8604416f673c983a7cab7a   # 3977 .lean files
CHALLENGE_SHA=4183b2057cff350d66848215ff7167196dfc20e1891b598fdddea59077a76685
CONFIG_SHA=debbfdc9c01104d2369be80da5180978275106df8b685f693fba7ce7da7c5b19
here=$(cd "$(dirname "$0")" && pwd)
tmp=$(mktemp -d)
git -C "$tmp" init -q
git -C "$tmp" remote add origin https://github.com/openai/math
git -C "$tmp" sparse-checkout set --no-cone /lean/OAI/Algorithms/SubexponentialSAT/ /lean/ComparatorChallenges/SubexponentialSAT.lean /lean/ComparatorChallenges/SubexponentialSAT.json /lean/lean-toolchain
git -C "$tmp" fetch -q --depth 1 origin "$COMMIT"
git -C "$tmp" checkout -q FETCH_HEAD
test "$(git -C "$tmp" rev-parse HEAD)" = "$COMMIT"
cmp "$tmp/lean/lean-toolchain" "$here/lean-toolchain"
rm -rf "$here/OAI" "$here/ComparatorChallenges"
mkdir -p "$here/OAI/Algorithms" "$here/ComparatorChallenges"
cp -r "$tmp/lean/OAI/Algorithms/SubexponentialSAT" "$here/OAI/Algorithms/"
cp "$tmp/lean/ComparatorChallenges/SubexponentialSAT.lean" "$here/ComparatorChallenges/"
cd "$here"
got=$(find OAI/Algorithms/SubexponentialSAT -name '*.lean' | LC_ALL=C sort | xargs sha256sum | sha256sum | cut -c1-64)
test "$got" = "$SRC_TREE_SHA" || { echo "SOURCE_TREE_MISMATCH|got=$got|json=0"; exit 1; }
test "$(sha256sum ComparatorChallenges/SubexponentialSAT.lean | cut -c1-64)" = "$CHALLENGE_SHA"
test "$(sha256sum "$tmp/lean/ComparatorChallenges/SubexponentialSAT.json" | cut -c1-64)" = "$CONFIG_SHA"
cmp "$tmp/lean/ComparatorChallenges/SubexponentialSAT.json" comparator.json
echo "SOURCES|commit=$COMMIT|tree_sha256=$got|files=$(find OAI -name '*.lean' | wc -l)|json=0"
