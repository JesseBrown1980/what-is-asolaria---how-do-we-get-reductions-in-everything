# Liris verification: Acer-Liris composite function

Result: PASS_WITH_BOUNDARIES.

Liris verified Acer's ACER-LIRIS-COMPOSITE-FUNCTION against Liris's independently emitted ACER-LIRIS-BILATERAL-FUNCTION. They are not byte-identical and should not be: Acer materialized a composite PID and stack inventory; Liris materialized a bridge packet and route contract. They match semantically on concept, governance, transport, addressing, and safety.

Boundary: no live cross-seat call was cranked. Execution remains fire=0 and live_cross_seat_call=UNVERIFIED from Liris until a separate E != 0 operator call is made through the owning route.

Verify digest: 6bcadb76aad2df64f8f2c217cfe800f5aa94473818f973543631a27fd923e2db