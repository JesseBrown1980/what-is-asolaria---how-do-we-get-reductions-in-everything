"""Independent recomputation of the Sidon-Tower Embedding (STE) certificate. json=0

Construction (ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md, "Sidon-Tower Embedding"):
  towers   p in [13, 17, 23, 31, 41, 47, 73, 79, 83, 89, 131]   (627 points = sum p)
  Part A   S_p = { 2pk + (k^2 mod p) : k = 0 .. p-1 }           (Erdos-Turan Sidon set)
  Part B   scale tower t by W_t = p_t^3
  Part C   anchor_{t+1} = anchor_t + maxIntraSpan_t + GUARD * p_t^3,  GUARD = 2^40
           point = anchor_t + s * p_t^3

Why there are no collisions (Jesse Daniel Brown's construction):
  - inside one tower: S_p is a Sidon set, so all differences are distinct (Erdos-Turan);
    scaling by p^3 keeps them distinct.
  - two towers t < u: a shared distance needs (y - y') p_u^3 = (x - x') p_t^3 with x, x'
    from tower t; then p_u^3 divides x - x', but |x - x'| < 2 p_t^2 < p_u^3, so x = x'
    and y = y'. Intra distances of different towers cannot meet for the same reason.
  - different tower pairs: the 2^40 guard puts every tower pair in its own band, and the
    smallest inter-tower distance exceeds the largest intra-tower distance.
This program checks all of it exactly, pair by pair, with Python integers.
"""
from collections import Counter
from itertools import combinations

PRIMES = [13, 17, 23, 31, 41, 47, 73, 79, 83, 89, 131]
GUARD = 1 << 40


def erdos_turan(p):
    return [2 * p * k + (k * k) % p for k in range(p)]


def ste():
    anchor, pts, tower = 0, [], []
    for p in PRIMES:
        s = sorted(x * p ** 3 for x in erdos_turan(p))
        pts += [anchor + x for x in s]
        tower += [p] * len(s)
        anchor += (s[-1] - s[0]) + GUARD * p ** 3
    return pts, tower


def main():
    pts, tower = ste()
    n = len(pts)
    dist = Counter(abs(pts[i] - pts[j]) for i, j in combinations(range(n), 2))
    pairs = n * (n - 1) // 2
    max_intra = max(abs(pts[i] - pts[j]) for i, j in combinations(range(n), 2) if tower[i] == tower[j])
    min_inter = min(abs(pts[i] - pts[j]) for i, j in combinations(range(n), 2) if tower[i] != tower[j])
    bound = all(2 * p * p < q ** 3 for p, q in combinations(PRIMES, 2))
    print("STE|points=%d|pairs=%d|distinct=%d|collisions=%d|min=%d|max=%d|json=0"
          % (n, pairs, len(dist), pairs - len(dist), min(dist), max(dist)))
    print("STE_SEPARATION|max_intra=%d|min_inter=%d|holds=%d|json=0" % (max_intra, min_inter, min_inter > max_intra))
    print("STE_BOUND|2p^2<q^3_for_all_p<q=%d|json=0" % bound)
    ok = (n == 627 and pairs == 196251 and len(dist) == pairs and min(dist) == 37349
          and max(dist) == 2617523875674652731 and min_inter > max_intra and bound)
    print("STE_VERDICT|%s|json=0" % ("CERTIFIED" if ok else "FAIL"))
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()
