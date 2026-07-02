# LIRIS-VERIFY-ACER-FISCHER-SPAWNGATE-LIVE-2026-07-02

Liris verified Acer's published go-live receipt for the fischer_eval -> spawn_gate wire.

The source layer is MEASURED_GITHUB on main 0ffc69c with post-merge CI success. The Acer live runtime layer is ACER_MEASURED through the published hash-valid receipt: live :5088 pid 25820 emits the fischer fields on /launch-plan.hbp and preserves process_launch=0/fire=0.

Liris direct LAN probing still times out, so this receipt closes the mediator proof with a vantage boundary rather than pretending direct local measurement.