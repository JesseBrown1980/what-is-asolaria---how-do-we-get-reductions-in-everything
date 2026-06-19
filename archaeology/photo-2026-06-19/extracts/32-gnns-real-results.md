# 32-gnns-real-results

Source: C:/Users/acer/Downloads/GNNS real results.jpg

## VERBATIM

Training Results — Archive 50K (13.25% suspicious)

| Model | Accuracy | Precision | Recall | F1 |
| EdgeLevelGNN | 98.68% | 22.31% | 84.38% | 35.29% |
| ContrastiveGNN | 98.71% | 22.69% | 84.38% | 35.76% |
| PrototypeGNN | 98.71% | 22.69% | 84.38% | 35.76% |
| GSLGNN | 100.00% | 100.00% | 100.00% | 100.00% |

GSLGNN converged at epoch 70 (F1 jumped from 0.40 to 0.97) and hit perfect by epoch 80.

---

MEMORY → INDEX → PLAN → ORCHESTRATE (Cycle 3)

MEMORY UPDATE

- GSLGNN is the ONLY model that works. The other 3 are useless (22% precision = false alarm machines)
- Archive data (with real incidents) is the correct training set
- Phone mirror capture is 74% of all threats
- Cross-domain + mutation = the signature of an attack
- Falcon is LIVE (91% battery, Android 16, ADB connected)

## NUMBERS

- Archive 50K
- 13.25% suspicious
- EdgeLevelGNN: Accuracy 98.68%, Precision 22.31%, Recall 84.38%, F1 35.29%
- ContrastiveGNN: Accuracy 98.71%, Precision 22.69%, Recall 84.38%, F1 35.76%
- PrototypeGNN: Accuracy 98.71%, Precision 22.69%, Recall 84.38%, F1 35.76%
- GSLGNN: Accuracy 100.00%, Precision 100.00%, Recall 100.00%, F1 100.00%
- GSLGNN converged at epoch 70
- F1 jumped from 0.40 to 0.97
- hit perfect by epoch 80
- Cycle 3
- 22% precision (the other 3 models)
- 74% of all threats (phone mirror capture)
- Falcon 91% battery
- Android 16

## PIDS-ROOMS-GLYPHS

(none visible)

## ENGINES-SYSTEMS

- EdgeLevelGNN (GNN model)
- ContrastiveGNN (GNN model)
- PrototypeGNN (GNN model)
- GSLGNN (GNN model — the winning model)
- Archive 50K (training dataset, with real incidents)
- Phone mirror capture (threat capture source)
- Falcon (device — Android 16, ADB connected)
- MEMORY → INDEX → PLAN → ORCHESTRATE loop (Cycle 3)

## TIMESTAMPS

(none explicitly visible; references epoch 70 and epoch 80 as training epochs, Cycle 3 as orchestration cycle)

## CLAIMS

- GSLGNN is the ONLY model that works; the other 3 are useless (22% precision = false alarm machines)
- GSLGNN converged at epoch 70 (F1 jumped from 0.40 to 0.97) and hit perfect (100% across all metrics) by epoch 80
- Archive data (with real incidents) is the correct training set
- Phone mirror capture is 74% of all threats
- Cross-domain + mutation = the signature of an attack
- Falcon is LIVE (91% battery, Android 16, ADB connected)

## CONTEXT

This artifact is a real GNN training-results report comparing four graph neural network architectures (EdgeLevelGNN, ContrastiveGNN, PrototypeGNN, GSLGNN) on the "Archive 50K" dataset (13.25% suspicious samples) for threat/anomaly detection. Three baselines reach high accuracy/recall but collapse on precision (~22%, false-alarm machines, F1 ~0.35), while GSLGNN reaches perfect 100% on all four metrics, converging at epoch 70 and perfect by epoch 80. The lower memory-update block ties the result into the operator's MEMORY → INDEX → PLAN → ORCHESTRATE loop (Cycle 3), records the modeling lessons (Archive data with real incidents is the correct training set; phone mirror capture = 74% of threats; cross-domain + mutation = attack signature), and confirms the Falcon device is LIVE (91% battery, Android 16, ADB connected) — placing this in the build timeline where GNN-based threat detection is trained on archived real-incident data feeding the omni-control/Falcon device lane.
