// @ts-nocheck
/* eslint-disable */
// v7rn quick runtime safety patch: global normalizeRegion fallback for Expo Router / simple React Native testing
const __OBJECTIVE100_MIN_REGION_SIZE = 0.06;
function __objective100Clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function __objective100RoundRegionValue(value) {
  return Math.round((value || 0) * 1000000) / 1000000;
}
function __objective100MakeId(prefix, extra) {
  return (
    prefix +
    "_" +
    Date.now().toString() +
    "_" +
    Math.floor(Math.random() * 100000).toString() +
    "_" +
    (extra || "0")
  );
}
function __objective100EnsureImmutableSourceId(existingId, prefix, extra) {
  return existingId ? String(existingId) : __objective100MakeId(prefix, extra);
}
const __objective100NormalizeRegionFallback =
  typeof normalizeRegion !== "undefined"
    ? normalizeRegion
    : function (region) {
        region = region || {};
        const rawWidth = typeof region.width === "number" ? region.width : 0.2;
        const rawHeight =
          typeof region.height === "number" ? region.height : 0.2;
        const width = __objective100Clamp(
          rawWidth,
          __OBJECTIVE100_MIN_REGION_SIZE,
          1,
        );
        const height = __objective100Clamp(
          rawHeight,
          __OBJECTIVE100_MIN_REGION_SIZE,
          1,
        );
        const rawX = typeof region.x === "number" ? region.x : 0;
        const rawY = typeof region.y === "number" ? region.y : 0;
        const x = __objective100Clamp(rawX, 0, 1 - width);
        const y = __objective100Clamp(rawY, 0, 1 - height);
        const immutableSourceCropId = __objective100EnsureImmutableSourceId(
          region.sourceCropId || region.id,
          "crop",
          region.label || "region",
        );
        return {
          id: region.id || immutableSourceCropId,
          sourceCropId: immutableSourceCropId,
          label: region.label,
          x: __objective100RoundRegionValue(x),
          y: __objective100RoundRegionValue(y),
          width: __objective100RoundRegionValue(width),
          height: __objective100RoundRegionValue(height),
          aspectMode: region.aspectMode || "free",
        };
      };

const ComponentFunction = function () {
  // v6rn.simple.objective100 - Debugged simple Expo React Native App.js build with literal theme fallback

  const React = require("react");
  const { useState, useEffect, useMemo, useContext, useRef } = React;
  const {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    Platform,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Image,
    PanResponder,
    Linking,
    LogBox,
  } = require("react-native");
  const { MaterialIcons } = require("@expo/vector-icons");
  const { useSafeAreaInsets } = require("react-native-safe-area-context");
  const AsyncStorageModule = require("@react-native-async-storage/async-storage");
  const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
  if (!global.__objective100LogBoxConfigured && LogBox) {
    global.__objective100LogBoxConfigured = true;
    LogBox.ignoreLogs([
      "Objective100 local storage",
      "Storage Load Error",
      "Saved local data could not be loaded",
    ]);
  }
  const OBJECTIVE100_STORAGE_KEY = "objective100_local_data_v1";
  const OBJECTIVE100_PERSISTED_KEYS = [
    "quizzes",
    "folders",
    "questions",
    "attemptLogs",
    "aiPlannerSchedule",
    "aiTutorChats",
    "wellbeingChats",
    "countdowns",
    "progressData",
  ];

  // Simple React Native / Expo demo hooks replacing the unavailable internal "platform-hooks" package.
  // Data now persists locally with AsyncStorage. This is local-only device storage, not a backend sync layer.
  const __objective100MemoryStore = global.__objective100MemoryStore || {};
  global.__objective100MemoryStore = __objective100MemoryStore;
  const __objective100StorageState = global.__objective100StorageState || {
    hydrated: false,
    loading: false,
    error: null,
    listeners: [],
    hydrationPromise: null,
    persistPromise: Promise.resolve(),
  };
  global.__objective100StorageState = __objective100StorageState;

  const notifyObjective100StoreListeners = function () {
    __objective100StorageState.listeners.slice().forEach(function (listener) {
      try {
        listener();
      } catch (e) {
        // Keep one broken subscriber from blocking the rest of the app.
      }
    });
  };

  const buildPersistableObjective100Store = function () {
    const snapshot = {};
    OBJECTIVE100_PERSISTED_KEYS.forEach(function (key) {
      snapshot[key] = Array.isArray(__objective100MemoryStore[key])
        ? __objective100MemoryStore[key]
        : [];
    });
    return snapshot;
  };

  const initializeEmptyObjective100Store = function () {
    OBJECTIVE100_PERSISTED_KEYS.forEach(function (key) {
      if (!Array.isArray(__objective100MemoryStore[key])) {
        __objective100MemoryStore[key] = [];
      }
    });
  };

  const applyStoredObjective100Data = function (storedData) {
    initializeEmptyObjective100Store();

    if (!storedData || typeof storedData !== "object") {
      return;
    }

    OBJECTIVE100_PERSISTED_KEYS.forEach(function (key) {
      __objective100MemoryStore[key] = Array.isArray(storedData[key])
        ? storedData[key]
        : [];
    });
  };

  const resetBrokenObjective100Storage = function () {
    initializeEmptyObjective100Store();

    try {
      return AsyncStorage.removeItem(OBJECTIVE100_STORAGE_KEY).catch(
        function () {
          return null;
        },
      );
    } catch (e) {
      return Promise.resolve(null);
    }
  };

  const hydrateObjective100Store = function () {
    if (__objective100StorageState.hydrated) {
      return Promise.resolve(__objective100MemoryStore);
    }

    if (__objective100StorageState.hydrationPromise) {
      return __objective100StorageState.hydrationPromise;
    }

    __objective100StorageState.loading = true;
    notifyObjective100StoreListeners();

    __objective100StorageState.hydrationPromise = AsyncStorage.getItem(
      OBJECTIVE100_STORAGE_KEY,
    )
      .then(function (storedValue) {
        if (storedValue) {
          try {
            const parsed = JSON.parse(storedValue);
            applyStoredObjective100Data(parsed);
          } catch (parseError) {
            __objective100StorageState.error = null;
            return resetBrokenObjective100Storage().then(function () {
              return __objective100MemoryStore;
            });
          }
        } else {
          initializeEmptyObjective100Store();
        }

        __objective100StorageState.error = null;
        return __objective100MemoryStore;
      })
      .catch(function (error) {
        __objective100StorageState.error = null;
        initializeEmptyObjective100Store();
        return __objective100MemoryStore;
      })
      .finally(function () {
        __objective100StorageState.hydrated = true;
        __objective100StorageState.loading = false;
        notifyObjective100StoreListeners();
      });

    return __objective100StorageState.hydrationPromise;
  };

  const persistObjective100Store = function () {
    const snapshot = buildPersistableObjective100Store();
    __objective100StorageState.persistPromise =
      __objective100StorageState.persistPromise
        .catch(function () {
          return null;
        })
        .then(function () {
          return AsyncStorage.setItem(
            OBJECTIVE100_STORAGE_KEY,
            JSON.stringify(snapshot),
          );
        })
        .then(function () {
          __objective100StorageState.error = null;
        })
        .catch(function (error) {
          __objective100StorageState.error = error;
          showMessage(
            "Storage Save Error",
            "Your latest change could not be saved permanently. Please keep the app open and try again.",
          );
        })
        .finally(function () {
          notifyObjective100StoreListeners();
        });

    return __objective100StorageState.persistPromise;
  };

  const useQuery = function (key) {
    const refreshState = useState(0);
    const setRefreshToken = refreshState[1];

    useEffect(function () {
      let mounted = true;
      const listener = function () {
        if (mounted) {
          setRefreshToken(function (previous) {
            return previous + 1;
          });
        }
      };

      __objective100StorageState.listeners.push(listener);
      hydrateObjective100Store();

      return function () {
        mounted = false;
        __objective100StorageState.listeners =
          __objective100StorageState.listeners.filter(function (item) {
            return item !== listener;
          });
      };
    }, []);

    const refetch = function () {
      hydrateObjective100Store().finally(function () {
        setRefreshToken(function (previous) {
          return previous + 1;
        });
      });
    };

    return {
      data: Array.isArray(__objective100MemoryStore[key])
        ? __objective100MemoryStore[key].slice()
        : [],
      loading:
        __objective100StorageState.loading ||
        !__objective100StorageState.hydrated,
      error: __objective100StorageState.error,
      refetch: refetch,
    };
  };

  const useMutation = function (key, action) {
    const mutate = function (item) {
      return hydrateObjective100Store().then(function () {
        if (!Array.isArray(__objective100MemoryStore[key])) {
          __objective100MemoryStore[key] = [];
        }

        if (action === "insert") {
          const exists = __objective100MemoryStore[key].some(function (entry) {
            return entry && item && entry.id === item.id;
          });
          if (exists) {
            __objective100MemoryStore[key] = __objective100MemoryStore[key].map(
              function (entry) {
                return entry && item && entry.id === item.id ? item : entry;
              },
            );
          } else {
            __objective100MemoryStore[key].push(item);
          }
        }

        if (action === "update") {
          const index = __objective100MemoryStore[key].findIndex(
            function (entry) {
              return entry && item && entry.id === item.id;
            },
          );

          if (index >= 0) {
            __objective100MemoryStore[key][index] = item;
          } else {
            __objective100MemoryStore[key].push(item);
          }
        }

        if (action === "delete") {
          __objective100MemoryStore[key] = __objective100MemoryStore[
            key
          ].filter(function (entry) {
            return entry && item && entry.id !== item.id;
          });
        }

        notifyObjective100StoreListeners();
        return persistObjective100Store().then(function () {
          return item;
        });
      });
    };

    return { mutate: mutate };
  };

  const LocalStorageGate = function (props) {
    const gateState = useState({
      loading:
        __objective100StorageState.loading ||
        !__objective100StorageState.hydrated,
      error: __objective100StorageState.error,
    });
    const storageStatus = gateState[0];
    const setStorageStatus = gateState[1];

    useEffect(function () {
      let mounted = true;
      const listener = function () {
        if (!mounted) return;
        setStorageStatus({
          loading:
            __objective100StorageState.loading ||
            !__objective100StorageState.hydrated,
          error: __objective100StorageState.error,
        });
      };

      __objective100StorageState.listeners.push(listener);
      hydrateObjective100Store().finally(listener);

      return function () {
        mounted = false;
        __objective100StorageState.listeners =
          __objective100StorageState.listeners.filter(function (item) {
            return item !== listener;
          });
      };
    }, []);

    if (storageStatus.loading) {
      return React.createElement(
        View,
        {
          style: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F5F7FB",
            padding: 24,
          },
        },
        React.createElement(ActivityIndicator, {
          size: "large",
          color: "#6D5BD0",
        }),
        React.createElement(
          Text,
          {
            style: {
              marginTop: 14,
              color: "#1E293B",
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
            },
          },
          "Loading saved Objective 100% data...",
        ),
      );
    }

    return props.children;
  };

  const useCamera = function () {
    const pickImage = function (options) {
      return new Promise(function (resolve) {
        try {
          const ImagePicker = require("expo-image-picker");
          ImagePicker.launchImageLibraryAsync(
            Object.assign(
              {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.9,
              },
              options || {},
            ),
          )
            .then(function (result) {
              if (result && result.canceled) {
                resolve(null);
                return;
              }
              resolve(result);
            })
            .catch(function () {
              resolve(null);
            });
        } catch (e) {
          showMessage(
            "Image Picker Missing",
            "Install it with: npx expo install expo-image-picker",
          );
          resolve(null);
        }
      });
    };

    const takePhoto = function (options) {
      return new Promise(function (resolve) {
        try {
          const ImagePicker = require("expo-image-picker");
          ImagePicker.requestCameraPermissionsAsync()
            .then(function (permission) {
              if (!permission || permission.status !== "granted") {
                showMessage(
                  "Camera Permission",
                  "Camera permission is needed to take photos.",
                );
                resolve(null);
                return null;
              }

              return ImagePicker.launchCameraAsync(
                Object.assign(
                  {
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: false,
                    quality: 0.9,
                  },
                  options || {},
                ),
              );
            })
            .then(function (result) {
              if (!result || result.canceled) {
                resolve(null);
                return;
              }
              resolve(result);
            })
            .catch(function () {
              resolve(null);
            });
        } catch (e) {
          showMessage(
            "Camera Module Missing",
            "Install it with: npx expo install expo-image-picker",
          );
          resolve(null);
        }
      });
    };

    return { takePhoto: takePhoto, pickImage: pickImage };
  };

  const primaryColor = "#24304F"; // Academic Navy
  const accentColor = "#6D5BD0"; // Dusty Purple
  const backgroundColor = "#F5F7FB"; // Cool Study Mist
  const cardColor = "#FFFFFF"; // Soft White
  const textPrimary = "#1E293B"; // Deep Slate
  const textSecondary = "#64748B"; // Slate Grey

  const navyDark = "#1B2542";
  const purpleSoft = "#7A5FD6";
  const lavenderMist = "#F0EEFF";
  const periwinkle = "#8EA4D2";
  const borderColor = "#DDE3EE";
  const disabledColor = "#94A3B8";

  const successColor = "#16A34A"; // Green zone only
  const errorColor = "#DC2626"; // Red zone only
  const warningColor = "#F97316"; // Orange zone only
  const MIN_REGION_SIZE = 0.06;

  const ThemeContext = React.createContext({
    theme: {
      colors: {
        primary: "#24304F",
        accent: "#6D5BD0",
        background: "#F5F7FB",
        card: "#FFFFFF",
        textPrimary: "#1E293B",
        textSecondary: "#64748B",
        border: "#DDE3EE",
        success: "#16A34A",
        error: "#DC2626",
        warning: "#F97316",
        disabled: "#94A3B8",
        lavender: "#F0EEFF",
        periwinkle: "#8EA4D2",
        navyDark: "#1B2542",
        purpleSoft: "#7A5FD6",
      },
    },
  });

  const ThemeProvider = function (props) {
    const theme = useMemo(function () {
      return {
        colors: {
          // v6 fix: use literal values here so ThemeProvider never crashes if Expo Router/Hermes loses access to local color constants.
          primary: "#24304F",
          accent: "#6D5BD0",
          background: "#F5F7FB",
          card: "#FFFFFF",
          textPrimary: "#1E293B",
          textSecondary: "#64748B",
          border: "#DDE3EE",
          success: "#16A34A",
          error: "#DC2626",
          warning: "#F97316",
          disabled: "#94A3B8",
          lavender: "#F0EEFF",
          periwinkle: "#8EA4D2",
          navyDark: "#1B2542",
          purpleSoft: "#7A5FD6",
        },
      };
    }, []);

    return React.createElement(
      ThemeContext.Provider,
      { value: { theme: theme } },
      props.children,
    );
  };

  const useTheme = function () {
    return useContext(ThemeContext);
  };

  const showMessage = function (title, message) {
    if (Platform.OS === "web") {
      window.alert(title + ": " + message);
    } else {
      Alert.alert(title, message);
    }
  };

  const confirmAction = function (title, message, onConfirm) {
    if (Platform.OS === "web") {
      const ok = window.confirm(title + "\n\n" + message);
      if (ok) onConfirm();
    } else {
      Alert.alert(title, message, [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", style: "destructive", onPress: onConfirm },
      ]);
    }
  };

  const formatDateTime = function (dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    } catch (e) {
      return dateString;
    }
  };

  const makeId = function (prefix, extra) {
    return (
      prefix +
      "_" +
      Date.now().toString() +
      "_" +
      Math.floor(Math.random() * 100000).toString() +
      "_" +
      (extra || "0")
    );
  };

  const ensureImmutableSourceId = function (existingId, prefix, extra) {
    return existingId ? String(existingId) : makeId(prefix, extra);
  };

  const normalizeUri = function (uri) {
    return uri ? String(uri).trim() : "";
  };

  const clamp = function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  };

  const roundRegionValue = function (value) {
    return Math.round((value || 0) * 1000000) / 1000000;
  };

  const getAspectValue = function (mode) {
    if (mode === "square") return 1;
    if (mode === "4:3") return 4 / 3;
    if (mode === "3:4") return 3 / 4;
    return null;
  };

  const getImageUrisFromPickerResult = function (result) {
    if (!result) return [];
    const uris = [];

    if (result.uri) uris.push(normalizeUri(result.uri));

    if (result.assets && Array.isArray(result.assets)) {
      result.assets.forEach(function (asset) {
        if (asset && asset.uri) uris.push(normalizeUri(asset.uri));
      });
    }

    return uris.filter(Boolean);
  };

  const getPossibleTextFieldsFromObject = function (value, depth, collector) {
    const safeDepth = typeof depth === "number" ? depth : 0;
    const bucket = collector || [];

    if (safeDepth > 3 || value === null || typeof value === "undefined") {
      return bucket;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) bucket.push(trimmed);
      return bucket;
    }

    if (Array.isArray(value)) {
      value.forEach(function (item) {
        getPossibleTextFieldsFromObject(item, safeDepth + 1, bucket);
      });
      return bucket;
    }

    if (typeof value === "object") {
      Object.keys(value).forEach(function (key) {
        const lowerKey = String(key || "").toLowerCase();
        const child = value[key];
        const looksUseful =
          lowerKey.indexOf("text") >= 0 ||
          lowerKey.indexOf("ocr") >= 0 ||
          lowerKey.indexOf("answer") >= 0 ||
          lowerKey.indexOf("content") >= 0 ||
          lowerKey.indexOf("description") >= 0 ||
          lowerKey.indexOf("label") >= 0 ||
          lowerKey.indexOf("name") >= 0 ||
          lowerKey.indexOf("filename") >= 0;

        if (looksUseful || safeDepth < 2) {
          getPossibleTextFieldsFromObject(child, safeDepth + 1, bucket);
        }
      });
    }

    return bucket;
  };

  const buildBestMarkSchemeTextFromPickerResult = function (
    result,
    manualText,
  ) {
    const rawCandidates = [];

    if (manualText && String(manualText).trim()) {
      rawCandidates.push(String(manualText).trim());
    }

    getPossibleTextFieldsFromObject(result, 0, rawCandidates);

    const normalizedCandidates = rawCandidates
      .map(function (item) {
        return sanitizeMarkSchemeText(item);
      })
      .filter(Boolean);

    const uniqueCandidates = [];
    const seen = {};

    normalizedCandidates.forEach(function (item) {
      const key = String(item).toUpperCase();
      if (!seen[key]) {
        seen[key] = true;
        uniqueCandidates.push(item);
      }
    });

    let bestText = "";
    let bestScore = -1;
    const mergedText = uniqueCandidates.join("\n");

    uniqueCandidates.forEach(function (candidate) {
      const answerMap = parseAnswerKeyFromText(candidate, 0);
      const answerCount = Object.keys(answerMap).length;
      const signalScore =
        answerCount * 100 +
        (candidate.match(/\b(?:QUESTION|Q|NO|ANSWER|ANS|ITEM)\b/g) || [])
          .length *
          8 +
        (candidate.match(/[A-D]/g) || []).length;

      if (signalScore > bestScore) {
        bestScore = signalScore;
        bestText = candidate;
      }
    });

    if (!bestText && mergedText) {
      bestText = mergedText;
    }

    return {
      bestText: bestText,
      mergedText: mergedText,
      candidates: uniqueCandidates,
    };
  };

  const dedupeImagesByUri = function (images) {
    const seen = {};
    return images.filter(function (item) {
      const key = normalizeUri(item.uri);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  };

  const getImageSizeAsync = function (uri) {
    return new Promise(function (resolve) {
      if (!uri) {
        resolve({ width: 1200, height: 1600 });
        return;
      }

      try {
        Image.getSize(
          uri,
          function (width, height) {
            resolve({
              width: width > 0 ? width : 1200,
              height: height > 0 ? height : 1600,
            });
          },
          function () {
            resolve({ width: 1200, height: 1600 });
          },
        );
      } catch (e) {
        resolve({ width: 1200, height: 1600 });
      }
    });
  };

  const getContainRect = function (
    imageWidth,
    imageHeight,
    containerWidth,
    containerHeight,
  ) {
    const safeImageWidth = imageWidth > 0 ? imageWidth : 1;
    const safeImageHeight = imageHeight > 0 ? imageHeight : 1;
    const safeContainerWidth = containerWidth > 0 ? containerWidth : 1;
    const safeContainerHeight = containerHeight > 0 ? containerHeight : 1;

    const imageRatio = safeImageWidth / safeImageHeight;
    const containerRatio = safeContainerWidth / safeContainerHeight;

    let width;
    let height;
    let x;
    let y;

    if (imageRatio > containerRatio) {
      width = safeContainerWidth;
      height = width / imageRatio;
      x = 0;
      y = (safeContainerHeight - height) / 2;
    } else {
      height = safeContainerHeight;
      width = height * imageRatio;
      y = 0;
      x = (safeContainerWidth - width) / 2;
    }

    return {
      x: x,
      y: y,
      width: width,
      height: height,
    };
  };

  const normalizeRegion = function (region) {
    region = region && typeof region === "object" ? region : {};
    const rawWidth = typeof region.width === "number" ? region.width : 0.2;
    const rawHeight = typeof region.height === "number" ? region.height : 0.2;
    const width = clamp(rawWidth, MIN_REGION_SIZE, 1);
    const height = clamp(rawHeight, MIN_REGION_SIZE, 1);
    const rawX = typeof region.x === "number" ? region.x : 0;
    const rawY = typeof region.y === "number" ? region.y : 0;
    const x = clamp(rawX, 0, 1 - width);
    const y = clamp(rawY, 0, 1 - height);
    const immutableSourceCropId = ensureImmutableSourceId(
      region.sourceCropId || region.id,
      "crop",
      region.label || "region",
    );

    return {
      id: region.id || immutableSourceCropId,
      sourceCropId: immutableSourceCropId,
      label: region.label,
      x: roundRegionValue(x),
      y: roundRegionValue(y),
      width: roundRegionValue(width),
      height: roundRegionValue(height),
      aspectMode: region.aspectMode || "free",
    };
  };

  const relabelRegions = function (regions) {
    return (Array.isArray(regions) ? regions : [])
      .filter(function (region) {
        return region && typeof region === "object";
      })
      .map(function (region, index) {
        return Object.assign({}, region, { label: "Q" + (index + 1) });
      });
  };

  const normalizeRegionList = function (regions) {
    return relabelRegions(
      (Array.isArray(regions) ? regions : [])
        .filter(function (region) {
          return region && typeof region === "object";
        })
        .map(function (region, index) {
          return normalizeRegion(
            Object.assign({}, region, {
              id: region.id || makeId("crop", index),
              label: region.label || "Q" + (index + 1),
            }),
          );
        }),
    );
  };

  const shuffleArray = function (arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  const renumberNormalizedQuestions = function (questionList, quizId) {
    return (questionList || []).map(function (question, index) {
      return normalizeQuestion(
        Object.assign({}, question, {
          questionNumber: index + 1,
          cropIndex:
            typeof question.cropIndex === "number" ? question.cropIndex : index,
          originalQuestionNumber:
            typeof question.originalQuestionNumber === "number"
              ? question.originalQuestionNumber
              : typeof question.questionNumber === "number"
                ? question.questionNumber
                : index + 1,
        }),
        quizId,
        index,
      );
    });
  };

  const dedupeQuestionsByIdentity = function (questionList, quizId) {
    const seen = {};
    const cleaned = [];

    (questionList || []).forEach(function (question, index) {
      const normalized = normalizeQuestion(question, quizId, index);
      const key =
        normalized.sourceQuestionId ||
        normalized.sourceCropId ||
        normalized.id ||
        normalized.imageUri ||
        (normalized.originalQuestionNumber
          ? "qn_" + String(normalized.originalQuestionNumber)
          : makeId("fallback", index));

      if (!seen[key]) {
        seen[key] = true;
        cleaned.push(normalized);
      }
    });

    return renumberNormalizedQuestions(cleaned, quizId);
  };

  const pickBestQuestionSource = function (
    tableQuestions,
    snapshotQuestions,
    quizId,
  ) {
    const fromTable = dedupeQuestionsByIdentity(tableQuestions || [], quizId);
    const fromSnapshot = dedupeQuestionsByIdentity(
      snapshotQuestions || [],
      quizId,
    );

    if (fromSnapshot.length > fromTable.length) {
      return fromSnapshot;
    }

    if (fromTable.length > 0) {
      return fromTable;
    }

    return fromSnapshot;
  };

  const applyAspectRatioFromAnchor = function (
    anchor,
    startRegion,
    candidateRegion,
    aspectMode,
  ) {
    const aspectValue = getAspectValue(aspectMode);
    if (!aspectValue) return normalizeRegion(candidateRegion);

    let x = candidateRegion.x;
    let y = candidateRegion.y;
    let width = candidateRegion.width;
    let height = candidateRegion.height;

    const right = startRegion.x + startRegion.width;
    const bottom = startRegion.y + startRegion.height;

    if (anchor === "topLeft") {
      width = clamp(width, MIN_REGION_SIZE, right);
      height = width / aspectValue;
      if (height > bottom) {
        height = bottom;
        width = height * aspectValue;
      }
      x = right - width;
      y = bottom - height;
    }

    if (anchor === "topRight") {
      width = clamp(width, MIN_REGION_SIZE, 1 - startRegion.x);
      height = width / aspectValue;
      if (height > bottom) {
        height = bottom;
        width = height * aspectValue;
      }
      x = startRegion.x;
      y = bottom - height;
    }

    if (anchor === "bottomLeft") {
      width = clamp(width, MIN_REGION_SIZE, right);
      height = width / aspectValue;
      if (startRegion.y + height > 1) {
        height = 1 - startRegion.y;
        width = height * aspectValue;
      }
      x = right - width;
      y = startRegion.y;
    }

    if (anchor === "bottomRight") {
      width = clamp(width, MIN_REGION_SIZE, 1 - startRegion.x);
      height = width / aspectValue;
      if (startRegion.y + height > 1) {
        height = 1 - startRegion.y;
        width = height * aspectValue;
      }
      x = startRegion.x;
      y = startRegion.y;
    }

    x = clamp(x, 0, 1 - width);
    y = clamp(y, 0, 1 - height);

    return normalizeRegion({
      id: startRegion.id,
      label: startRegion.label,
      x: x,
      y: y,
      width: width,
      height: height,
      aspectMode: aspectMode,
    });
  };

  const getResizedRegionFromAnchor = function (
    anchor,
    startRegion,
    dxNorm,
    dyNorm,
    aspectMode,
  ) {
    const right = startRegion.x + startRegion.width;
    const bottom = startRegion.y + startRegion.height;

    let next = {
      id: startRegion.id,
      label: startRegion.label,
      x: startRegion.x,
      y: startRegion.y,
      width: startRegion.width,
      height: startRegion.height,
      aspectMode: aspectMode,
    };

    if (anchor === "topLeft") {
      const newX = clamp(startRegion.x + dxNorm, 0, right - MIN_REGION_SIZE);
      const newY = clamp(startRegion.y + dyNorm, 0, bottom - MIN_REGION_SIZE);
      next.x = newX;
      next.y = newY;
      next.width = right - newX;
      next.height = bottom - newY;
    }

    if (anchor === "topRight") {
      const newWidth = clamp(
        startRegion.width + dxNorm,
        MIN_REGION_SIZE,
        1 - startRegion.x,
      );
      const newY = clamp(startRegion.y + dyNorm, 0, bottom - MIN_REGION_SIZE);
      next.x = startRegion.x;
      next.y = newY;
      next.width = newWidth;
      next.height = bottom - newY;
    }

    if (anchor === "bottomLeft") {
      const newX = clamp(startRegion.x + dxNorm, 0, right - MIN_REGION_SIZE);
      const newHeight = clamp(
        startRegion.height + dyNorm,
        MIN_REGION_SIZE,
        1 - startRegion.y,
      );
      next.x = newX;
      next.y = startRegion.y;
      next.width = right - newX;
      next.height = newHeight;
    }

    if (anchor === "bottomRight") {
      const newWidth = clamp(
        startRegion.width + dxNorm,
        MIN_REGION_SIZE,
        1 - startRegion.x,
      );
      const newHeight = clamp(
        startRegion.height + dyNorm,
        MIN_REGION_SIZE,
        1 - startRegion.y,
      );
      next.x = startRegion.x;
      next.y = startRegion.y;
      next.width = newWidth;
      next.height = newHeight;
    }

    next = normalizeRegion(next);
    return applyAspectRatioFromAnchor(anchor, startRegion, next, aspectMode);
  };

  const normalizeQuestion = function (question, quizId, index) {
    const normalizedCropMeta = question.cropMeta
      ? normalizeRegion(question.cropMeta)
      : null;
    const immutableSourceCropId =
      question.sourceCropId ||
      (normalizedCropMeta && normalizedCropMeta.sourceCropId) ||
      (normalizedCropMeta && normalizedCropMeta.id) ||
      question.id ||
      makeId("crop", index);
    const immutableSourceQuestionId =
      question.sourceQuestionId ||
      immutableSourceCropId ||
      question.id ||
      makeId("q", index);

    return {
      id: question.id || immutableSourceQuestionId,
      sourceQuestionId: immutableSourceQuestionId,
      sourceCropId: immutableSourceCropId,
      quizId: quizId,
      questionNumber:
        typeof question.questionNumber === "number"
          ? question.questionNumber
          : index + 1,
      originalQuestionNumber:
        typeof question.originalQuestionNumber === "number"
          ? question.originalQuestionNumber
          : typeof question.questionNumber === "number"
            ? question.questionNumber
            : index + 1,
      imageUri: question.imageUri || "",
      imageWidth: question.imageWidth || 1200,
      imageHeight: question.imageHeight || 1600,
      cropMeta: normalizedCropMeta,
      optionA: question.optionA || "Option A",
      optionB: question.optionB || "Option B",
      optionC: question.optionC || "Option C",
      optionD: question.optionD || "Option D",
      correctAnswer: question.correctAnswer || question.answerValue || "A",
      answerValue: question.answerValue || question.correctAnswer || "A",
      answerSource: question.answerSource || "Manual / Default",
      questionText: question.questionText || "",
      ocrStatus: question.ocrStatus || "pending",
      sourceType: question.sourceType || "image",
      sourceFileName: question.sourceFileName || "",
      sourceDocumentId: question.sourceDocumentId || "",
      sourcePage:
        typeof question.sourcePage === "number" ? question.sourcePage : 0,
      cropIndex:
        typeof question.cropIndex === "number" ? question.cropIndex : index,
    };
  };

  const sortReviewItemsForResults = function (items) {
    const order = { incorrect: 0, skipped: 1, correct: 2 };
    return (items || []).slice().sort(function (a, b) {
      const ao =
        typeof order[a.resultType] === "number" ? order[a.resultType] : 99;
      const bo =
        typeof order[b.resultType] === "number" ? order[b.resultType] : 99;
      if (ao !== bo) return ao - bo;
      return (a.originalQuestionNumber || 0) - (b.originalQuestionNumber || 0);
    });
  };

  const getPracticeQuestionsFromLatestAttempt = function (
    questionList,
    latestAttempt,
  ) {
    const baseQuestions = (questionList || []).slice();

    if (
      !latestAttempt ||
      !latestAttempt.answerReview ||
      !Array.isArray(latestAttempt.answerReview)
    ) {
      return [];
    }

    const latestReview = sortReviewItemsForResults(
      latestAttempt.answerReview,
    ).filter(function (item) {
      return item.resultType === "incorrect" || item.resultType === "skipped";
    });

    if (latestReview.length === 0) {
      return [];
    }

    const questionMapById = {};
    const questionMapBySourceId = {};
    const questionMapByOriginalNumber = {};

    baseQuestions.forEach(function (question) {
      if (question && question.id) {
        questionMapById[question.id] = question;
      }

      if (question && question.sourceQuestionId) {
        questionMapBySourceId[question.sourceQuestionId] = question;
      }

      const originalNumber =
        typeof question.originalQuestionNumber === "number"
          ? question.originalQuestionNumber
          : typeof question.questionNumber === "number"
            ? question.questionNumber
            : null;

      if (
        originalNumber !== null &&
        typeof questionMapByOriginalNumber[originalNumber] === "undefined"
      ) {
        questionMapByOriginalNumber[originalNumber] = question;
      }
    });

    const practiceQuestions = latestReview
      .map(function (item, index) {
        const matchedQuestion =
          questionMapBySourceId[item.sourceQuestionId] ||
          questionMapById[item.questionId] ||
          questionMapByOriginalNumber[item.originalQuestionNumber] ||
          null;

        if (!matchedQuestion) return null;

        return Object.assign({}, matchedQuestion, {
          id: matchedQuestion.id || matchedQuestion.sourceQuestionId,
          sourceQuestionId:
            matchedQuestion.sourceQuestionId ||
            item.sourceQuestionId ||
            matchedQuestion.id,
          sourceCropId:
            matchedQuestion.sourceCropId ||
            item.sourceCropId ||
            matchedQuestion.id,
          questionNumber: index + 1,
          originalQuestionNumber:
            typeof matchedQuestion.originalQuestionNumber === "number"
              ? matchedQuestion.originalQuestionNumber
              : item.originalQuestionNumber || index + 1,
          practiceSourceResultType: item.resultType || "incorrect",
        });
      })
      .filter(Boolean);

    return practiceQuestions;
  };

  const sanitizeQuestionNumberToken = function (rawToken) {
    const token = rawToken ? String(rawToken).replace(/[^0-9]/g, "") : "";
    if (!token) return 0;
    const qn = parseInt(token, 10);
    return isNaN(qn) ? 0 : qn;
  };

  const cleanSingleCharacterOcrToken = function (rawToken) {
    return rawToken
      ? String(rawToken)
          .toUpperCase()
          .replace(/[\[\]\(\)\{\}<>\u0000-\u001f]/g, "")
          .replace(/[^A-Z0-9]/g, "")
      : "";
  };

  const normalizeDetectedAnswerToken = function (rawToken) {
    const token = cleanSingleCharacterOcrToken(rawToken);

    if (!token) return "";
    if (["A", "B", "C", "D"].indexOf(token) >= 0) return token;

    const directMap = {
      "4": "A",
      "6": "B",
      "8": "B",
      "3": "B",
      "0": "D",
      O: "D",
      Q: "D",
      "00": "D",
    };

    if (directMap[token]) return directMap[token];
    if (token === "I" || token === "L" || token === "1" || token === "7")
      return "";
    if (token === "E" || token === "F") return "";
    if (token.indexOf("A") === 0) return "A";
    if (token.indexOf("B") === 0) return "B";
    if (token.indexOf("C") === 0) return "C";
    if (token.indexOf("D") === 0) return "D";

    if (token.length > 1) {
      const letterMatch = token.match(/[ABCD]/);
      if (letterMatch) return letterMatch[0];
      const mappedChars = token
        .split("")
        .map(function (char) {
          return directMap[char] || (/[ABCD]/.test(char) ? char : "");
        })
        .filter(Boolean);
      if (mappedChars.length > 0) return mappedChars[0];
    }

    return "";
  };

  const sanitizeMarkSchemeText = function (rawText) {
    const source = rawText ? String(rawText) : "";
    return source
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[|]/g, "I")
      .replace(/[\u2022\u25CF\u25E6]/g, " ")
      .replace(/[§$]/g, "5")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u00A0]/g, " ")
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const splitMarkSchemeIntoLogicalLines = function (rawText) {
    const source = rawText ? String(rawText) : "";
    return source
      .replace(/\r/g, "\n")
      .split(/\n+/)
      .map(function (line) {
        return sanitizeMarkSchemeText(line);
      })
      .filter(Boolean);
  };

  const parseSequentialAnswerStream = function (rawText, questionCount) {
    const cleanText = sanitizeMarkSchemeText(rawText).toUpperCase();
    const answerMap = {};
    if (!cleanText) return answerMap;

    const stream = (cleanText.match(/[A-D480OQ]/g) || [])
      .map(function (token) {
        return normalizeDetectedAnswerToken(token);
      })
      .filter(Boolean);

    const maxCount = questionCount || stream.length;
    stream.slice(0, maxCount).forEach(function (answer, index) {
      answerMap[index + 1] = answer;
    });

    return answerMap;
  };

  const parseNumberAnswerPairsFromLine = function (line, questionCount) {
    const answerMap = {};
    const cleanLine = sanitizeMarkSchemeText(line).toUpperCase();
    if (!cleanLine) return answerMap;

    const pairPatterns = [
      /(?:QUESTION|Q|NO|NUMBER|ITEM|ANS|ANSWER)?\s*(\d{1,3})\s*[\.|\)|\]|\-|\:|,]?\s*(?:ANS|ANSWER)?\s*[\:=\-]?\s*\(?\[?\{?\s*([A-D480OQ])\s*\)?\]?\}?/g,
      /(\d{1,3})\s*(?:IS|=|\-|\:)?\s*\(?\[?\{?\s*([A-D480OQ])\s*\)?\]?\}?/g,
      /(\d{1,3})\s*[\.\)\]\-\:]\s*([A-D480OQ])\b/g,
      /(?:^|\s)(\d{1,3})([A-D480OQ])(?:\s|$)/g,
      /(?:QUESTION|Q)\s*(\d{1,3})\D{0,8}([A-D480OQ])/g,
      /(?:ANS|ANSWER)\D{0,8}(\d{1,3})\D{0,8}([A-D480OQ])/g,
    ];

    pairPatterns.forEach(function (pattern) {
      let match;
      while ((match = pattern.exec(cleanLine)) !== null) {
        const qn = sanitizeQuestionNumberToken(match[1]);
        const ans = normalizeDetectedAnswerToken(match[2]);
        if (qn > 0 && (!questionCount || qn <= questionCount) && ans) {
          answerMap[qn] = ans;
        }
      }
    });

    return answerMap;
  };

  const parseDenseTableAnswerPairs = function (rawText, questionCount) {
    const answerMap = {};
    const lines = splitMarkSchemeIntoLogicalLines(rawText);

    lines.forEach(function (line) {
      const cells = line
        .replace(/\bMARKS?\b/gi, " ")
        .replace(/\bQUESTION\b/gi, " ")
        .replace(/\bANSWER\b/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(/[\s,;]+/)
        .filter(Boolean);

      for (let i = 0; i < cells.length - 1; i++) {
        const qn = sanitizeQuestionNumberToken(cells[i]);
        const ans = normalizeDetectedAnswerToken(cells[i + 1]);
        if (qn > 0 && (!questionCount || qn <= questionCount) && ans) {
          answerMap[qn] = ans;
        }
      }
    });

    return answerMap;
  };

  const parseAnswerKeyFromText = function (rawText, questionCount) {
    const cleanedSource = sanitizeMarkSchemeText(rawText);
    const cleanText = cleanedSource ? cleanedSource.toUpperCase() : "";
    const maxCount = questionCount || 0;
    const answerMap = {};

    if (!cleanText.trim()) {
      return answerMap;
    }

    const mergeAnswerMap = function (incomingMap, overwriteExisting) {
      Object.keys(incomingMap || {}).forEach(function (key) {
        const qn = sanitizeQuestionNumberToken(key);
        const ans = normalizeDetectedAnswerToken(incomingMap[key]);
        if (!qn || !ans) return;
        if (maxCount && qn > maxCount) return;
        if (overwriteExisting || !answerMap[qn]) {
          answerMap[qn] = ans;
        }
      });
    };

    const logicalLines = splitMarkSchemeIntoLogicalLines(rawText);

    logicalLines.forEach(function (line) {
      mergeAnswerMap(parseNumberAnswerPairsFromLine(line, maxCount), true);
    });

    if (Object.keys(answerMap).length > 0) {
      return answerMap;
    }

    mergeAnswerMap(parseDenseTableAnswerPairs(rawText, maxCount), true);
    if (Object.keys(answerMap).length > 0) {
      return answerMap;
    }

    const compactText = cleanText
      .replace(/\bCAMBRIDGE\b/g, " ")
      .replace(/\bINTERNATIONAL\b/g, " ")
      .replace(/\bAS\b/g, " ")
      .replace(/\bA\b\s*&\s*\bLEVEL\b/g, " ")
      .replace(/\bMARK\s*SCHEME\b/g, " ")
      .replace(/\bPUBLISHED\b/g, " ")
      .replace(/\bQUESTION\b/g, " ")
      .replace(/\bANSWER\b/g, " ")
      .replace(/\bMARKS?\b/g, " ")
      .replace(/\bPAGE\s*\d+\s*OF\s*\d+\b/g, " ")
      .replace(/\b\d{4}\/\d{2}\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const tablePattern = /(\d{1,3})\s+([A-D480OQ])(?:\s+\d+)?/g;
    let tableMatch;
    while ((tableMatch = tablePattern.exec(compactText)) !== null) {
      const qn = sanitizeQuestionNumberToken(tableMatch[1]);
      const ans = normalizeDetectedAnswerToken(tableMatch[2]);
      if (qn > 0 && (!maxCount || qn <= maxCount) && ans) {
        answerMap[qn] = ans;
      }
    }

    if (Object.keys(answerMap).length > 0) {
      return answerMap;
    }

    mergeAnswerMap(parseSequentialAnswerStream(rawText, maxCount), true);

    return answerMap;
  };

  const applyMarkSchemeToQuestionList = function (questionList, options) {
    const answerMap = options && options.answerMap ? options.answerMap : {};
    const sourceLabel =
      options && options.sourceLabel
        ? options.sourceLabel
        : "Uploaded Mark Scheme";
    const hasParsedAnswers = Object.keys(answerMap).length > 0;

    return (questionList || []).map(function (question, index) {
      const originalNumber =
        typeof question.originalQuestionNumber === "number"
          ? question.originalQuestionNumber
          : typeof question.questionNumber === "number"
            ? question.questionNumber
            : index + 1;
      const detectedAnswer = answerMap[originalNumber] || "";
      const nextAnswerValue =
        detectedAnswer || question.answerValue || question.correctAnswer || "";
      const nextAnswerSource = detectedAnswer
        ? sourceLabel
        : question.answerSource || sourceLabel + " (image only)";

      return Object.assign({}, question, {
        answerValue: nextAnswerValue,
        answerSource: nextAnswerSource,
        correctAnswer:
          detectedAnswer || question.correctAnswer || nextAnswerValue || "A",
      });
    });
  };

  const buildMarkSchemeDraftAnswers = function (questionList) {
    return (questionList || []).map(function (question, index) {
      const answerValue = question.answerValue || question.correctAnswer || "";
      return {
        questionId: question.id,
        questionNumber:
          typeof question.originalQuestionNumber === "number"
            ? question.originalQuestionNumber
            : typeof question.questionNumber === "number"
              ? question.questionNumber
              : index + 1,
        answerValue:
          ["A", "B", "C", "D"].indexOf(answerValue) >= 0 ? answerValue : "",
      };
    });
  };

  const convertMarkSchemeDraftToAnswerMap = function (draftAnswers) {
    const answerMap = {};
    (draftAnswers || []).forEach(function (item) {
      const qn =
        item && item.questionNumber ? parseInt(item.questionNumber, 10) : 0;
      const ans =
        item && item.answerValue ? String(item.answerValue).toUpperCase() : "";
      if (qn > 0 && ["A", "B", "C", "D"].indexOf(ans) >= 0) {
        answerMap[qn] = ans;
      }
    });
    return answerMap;
  };

  const getCropPixelRect = function (cropMeta, imageWidth, imageHeight) {
    const safeImageWidth = imageWidth > 0 ? imageWidth : 1;
    const safeImageHeight = imageHeight > 0 ? imageHeight : 1;

    if (!cropMeta) {
      return {
        x: 0,
        y: 0,
        width: safeImageWidth,
        height: safeImageHeight,
      };
    }

    const region = normalizeRegion(cropMeta);

    return {
      x: roundRegionValue(region.x * safeImageWidth),
      y: roundRegionValue(region.y * safeImageHeight),
      width: Math.max(1, roundRegionValue(region.width * safeImageWidth)),
      height: Math.max(1, roundRegionValue(region.height * safeImageHeight)),
    };
  };

  const getExactCropPreviewLayout = function (
    cropMeta,
    imageWidth,
    imageHeight,
    containerWidth,
    containerHeight,
  ) {
    const safeContainerWidth = containerWidth > 0 ? containerWidth : 1;
    const safeContainerHeight = containerHeight > 0 ? containerHeight : 1;
    const safeImageWidth = imageWidth > 0 ? imageWidth : 1;
    const safeImageHeight = imageHeight > 0 ? imageHeight : 1;

    if (!cropMeta) {
      const fullRect = getContainRect(
        safeImageWidth,
        safeImageHeight,
        safeContainerWidth,
        safeContainerHeight,
      );

      return {
        viewportLeft: fullRect.x,
        viewportTop: fullRect.y,
        viewportWidth: fullRect.width,
        viewportHeight: fullRect.height,
        imageLeft: 0,
        imageTop: 0,
        imageRenderWidth: fullRect.width,
        imageRenderHeight: fullRect.height,
      };
    }

    const cropRect = getCropPixelRect(
      cropMeta,
      safeImageWidth,
      safeImageHeight,
    );
    const scale = Math.min(
      safeContainerWidth / cropRect.width,
      safeContainerHeight / cropRect.height,
    );

    const viewportWidth = cropRect.width * scale;
    const viewportHeight = cropRect.height * scale;
    const viewportLeft = (safeContainerWidth - viewportWidth) / 2;
    const viewportTop = (safeContainerHeight - viewportHeight) / 2;

    return {
      viewportLeft: viewportLeft,
      viewportTop: viewportTop,
      viewportWidth: viewportWidth,
      viewportHeight: viewportHeight,
      imageLeft: -(cropRect.x * scale),
      imageTop: -(cropRect.y * scale),
      imageRenderWidth: safeImageWidth * scale,
      imageRenderHeight: safeImageHeight * scale,
    };
  };

  const getCropAspectRatio = function (cropMeta, imageWidth, imageHeight) {
    if (!cropMeta) {
      return imageWidth > 0 && imageHeight > 0
        ? imageHeight / imageWidth
        : 4 / 3;
    }

    const region = normalizeRegion(cropMeta);
    const cropPixelWidth = Math.max(1, imageWidth * region.width);
    const cropPixelHeight = Math.max(1, imageHeight * region.height);
    return cropPixelHeight / cropPixelWidth;
  };

  const getSafeCropPreviewHeight = function (
    cropMeta,
    imageWidth,
    imageHeight,
    width,
    minHeight,
    maxHeight,
  ) {
    const ratio = getCropAspectRatio(cropMeta, imageWidth, imageHeight);
    const nextHeight = width * ratio;
    return Math.max(minHeight || 80, Math.min(maxHeight || 360, nextHeight));
  };

  const CroppedImageView = function (props) {
    const initialImageWidth = props.imageWidth || 1200;
    const initialImageHeight = props.imageHeight || 1600;
    const [measuredSize, setMeasuredSize] = useState({
      width: initialImageWidth,
      height: initialImageHeight,
    });
    const cropMeta = props.cropMeta ? normalizeRegion(props.cropMeta) : null;
    const width = props.width || 220;
    const borderRadius =
      typeof props.borderRadius === "number" ? props.borderRadius : 12;

    useEffect(
      function () {
        setMeasuredSize({
          width: props.imageWidth || 1200,
          height: props.imageHeight || 1600,
        });
      },
      [props.imageWidth, props.imageHeight, props.uri],
    );

    const imageWidth = measuredSize.width || initialImageWidth;
    const imageHeight = measuredSize.height || initialImageHeight;

    let finalHeight = props.height || 180;

    if (cropMeta && !props.height) {
      finalHeight = getSafeCropPreviewHeight(
        cropMeta,
        imageWidth,
        imageHeight,
        width,
        80,
        320,
      );
    }

    const handleImageLoad = function (event) {
      const source =
        event && event.nativeEvent ? event.nativeEvent.source : null;
      const nextWidth = source && source.width ? source.width : imageWidth;
      const nextHeight = source && source.height ? source.height : imageHeight;

      if (
        nextWidth > 0 &&
        nextHeight > 0 &&
        (nextWidth !== measuredSize.width || nextHeight !== measuredSize.height)
      ) {
        setMeasuredSize({ width: nextWidth, height: nextHeight });
      }

      if (props.onImageMeasured && nextWidth > 0 && nextHeight > 0) {
        props.onImageMeasured({ width: nextWidth, height: nextHeight });
      }
    };

    const layout = getExactCropPreviewLayout(
      cropMeta,
      imageWidth,
      imageHeight,
      width,
      finalHeight,
    );

    return React.createElement(
      View,
      {
        style: {
          width: width,
          height: finalHeight,
          borderRadius: borderRadius,
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          alignSelf: props.alignSelf || "center",
        },
      },
      React.createElement(
        View,
        {
          style: {
            position: "absolute",
            left: layout.viewportLeft,
            top: layout.viewportTop,
            width: layout.viewportWidth,
            height: layout.viewportHeight,
            overflow: "hidden",
            borderRadius: Math.max(0, borderRadius - 2),
            backgroundColor: "#FFFFFF",
          },
        },
        React.createElement(Image, {
          source: { uri: props.uri },
          style: {
            position: "absolute",
            left: layout.imageLeft,
            top: layout.imageTop,
            width: layout.imageRenderWidth,
            height: layout.imageRenderHeight,
          },
          resizeMode: "stretch",
          onLoad: handleImageLoad,
        }),
      ),
    );
  };

  const QuestionZoomModal = function (props) {
    if (!props.visible || !props.image) return null;

    const theme = props.theme;
    const image = props.image;
    const safeWidth =
      props.screenWidth && props.screenWidth > 0 ? props.screenWidth : 360;
    const maxPreviewWidth = Math.max(220, safeWidth - 32);

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.zoomModalOverlay,
            {
              paddingTop: 12 + (props.insetsTop || 0),
              paddingBottom: 12 + (props.insetsBottom || 0),
            },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.zoomModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.zoomModalHeader },
            React.createElement(
              View,
              { style: { flex: 1, paddingRight: 12 } },
              React.createElement(
                Text,
                {
                  style: [
                    styles.zoomModalTitle,
                    { color: theme.colors.primary },
                  ],
                },
                props.title || "Question Preview",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.zoomModalHint,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Tap close to return to the quiz",
              ),
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            ScrollView,
            {
              style: { flex: 1 },
              contentContainerStyle: styles.zoomModalScrollContent,
              maximumZoomScale: 3,
              minimumZoomScale: 1,
              showsVerticalScrollIndicator: false,
              showsHorizontalScrollIndicator: false,
              bouncesZoom: true,
              centerContent: true,
            },
            React.createElement(CroppedImageView, {
              uri: image.uri,
              cropMeta: image.cropMeta,
              imageWidth: image.imageWidth,
              imageHeight: image.imageHeight,
              width: maxPreviewWidth,
              borderRadius: 16,
            }),
          ),
        ),
      ),
    );
  };

  const AppHeader = function (props) {
    const theme = props.theme;
    return React.createElement(
      View,
      {
        style: [
          styles.appHeader,
          {
            backgroundColor: theme.colors.background,
            borderBottomColor: "rgba(221,227,238,0.0)",
            paddingTop: props.topInset || 0,
          },
        ],
      },
      React.createElement(
        View,
        { style: styles.appHeaderRow },
        React.createElement(
          TouchableOpacity,
          {
            style: styles.headerIconButton,
            onPress: props.onBack || function () {},
            disabled: !props.showBack,
          },
          props.showBack
            ? React.createElement(MaterialIcons, {
                name: "arrow-back",
                size: 24,
                color: theme.colors.primary,
              })
            : React.createElement(View, { style: { width: 24, height: 24 } }),
        ),
        React.createElement(
          Text,
          { style: [styles.appHeaderTitle, { color: theme.colors.primary }] },
          props.title || "",
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: styles.headerIconButton,
            onPress: props.onNext || function () {},
            disabled: !props.showNext,
          },
          props.showNext
            ? React.createElement(MaterialIcons, {
                name: "arrow-forward",
                size: 24,
                color: theme.colors.primary,
              })
            : React.createElement(View, { style: { width: 24, height: 24 } }),
        ),
      ),
    );
  };

  const DismissButton = function (props) {
    return React.createElement(
      TouchableOpacity,
      {
        style: styles.dismissButton,
        onPress: props.onPress,
      },
      React.createElement(MaterialIcons, {
        name: "close",
        size: 22,
        color: props.color || "#1E293B",
      }),
    );
  };

  const CameraPickerModal = function (props) {
    if (!props.visible) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.modalCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              {
                style: [
                  styles.modalTitle,
                  { color: props.theme.colors.primary },
                ],
              },
              "Add Question Images",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: props.theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: props.theme.colors.textSecondary },
              ],
            },
            "Take a photo or choose multiple images from gallery",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                { backgroundColor: props.theme.colors.primary },
              ],
              onPress: props.onTakePhoto,
            },
            React.createElement(MaterialIcons, {
              name: "camera-alt",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Take Photo",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                { backgroundColor: props.theme.colors.accent },
              ],
              onPress: props.onPickImage,
            },
            React.createElement(MaterialIcons, {
              name: "photo-library",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Choose From Gallery",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalSecondaryButton,
                { borderColor: props.theme.colors.border },
              ],
              onPress: props.onClose,
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.modalSecondaryButtonText,
                  { color: props.theme.colors.textSecondary },
                ],
              },
              "Cancel",
            ),
          ),
        ),
      ),
    );
  };

  const CropRegionOverlay = function (props) {
    const regionRef = useRef(props.region);
    const aspectModeRef = useRef(props.aspectMode);
    const dragStartRef = useRef(null);
    const resizeStartRef = useRef(null);

    useEffect(
      function () {
        regionRef.current = props.region;
      },
      [props.region],
    );

    useEffect(
      function () {
        aspectModeRef.current = props.aspectMode;
      },
      [props.aspectMode],
    );

    const dragResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: function () {
          return true;
        },
        onMoveShouldSetPanResponder: function () {
          return true;
        },
        onPanResponderGrant: function () {
          const liveRegion = regionRef.current;
          dragStartRef.current = {
            id: liveRegion.id,
            label: liveRegion.label,
            x: liveRegion.x,
            y: liveRegion.y,
            width: liveRegion.width,
            height: liveRegion.height,
            aspectMode: liveRegion.aspectMode,
          };
          if (props.onPress) props.onPress();
        },
        onPanResponderMove: function (_, gesture) {
          if (!dragStartRef.current) return;

          const start = dragStartRef.current;
          const nx = clamp(
            start.x + gesture.dx / props.contentWidth,
            0,
            1 - start.width,
          );
          const ny = clamp(
            start.y + gesture.dy / props.contentHeight,
            0,
            1 - start.height,
          );

          props.onChange(
            normalizeRegion({
              id: start.id,
              label: start.label,
              x: nx,
              y: ny,
              width: start.width,
              height: start.height,
              aspectMode: start.aspectMode || aspectModeRef.current,
            }),
          );
        },
      }),
    ).current;

    const createCornerResponder = function (anchor) {
      return PanResponder.create({
        onStartShouldSetPanResponder: function () {
          return true;
        },
        onMoveShouldSetPanResponder: function () {
          return true;
        },
        onPanResponderGrant: function () {
          const liveRegion = regionRef.current;
          resizeStartRef.current = {
            id: liveRegion.id,
            label: liveRegion.label,
            x: liveRegion.x,
            y: liveRegion.y,
            width: liveRegion.width,
            height: liveRegion.height,
            aspectMode: liveRegion.aspectMode || aspectModeRef.current,
          };
          if (props.onPress) props.onPress();
        },
        onPanResponderMove: function (_, gesture) {
          if (!resizeStartRef.current) return;

          const dxNorm = gesture.dx / props.contentWidth;
          const dyNorm = gesture.dy / props.contentHeight;

          const nextRegion = getResizedRegionFromAnchor(
            anchor,
            resizeStartRef.current,
            dxNorm,
            dyNorm,
            resizeStartRef.current.aspectMode || aspectModeRef.current,
          );

          props.onChange(nextRegion);
        },
      });
    };

    const topLeftResponder = useRef(createCornerResponder("topLeft")).current;
    const topRightResponder = useRef(createCornerResponder("topRight")).current;
    const bottomLeftResponder = useRef(
      createCornerResponder("bottomLeft"),
    ).current;
    const bottomRightResponder = useRef(
      createCornerResponder("bottomRight"),
    ).current;

    const overlayLeft = props.contentLeft + props.region.x * props.contentWidth;
    const overlayTop = props.contentTop + props.region.y * props.contentHeight;
    const overlayWidth = props.region.width * props.contentWidth;
    const overlayHeight = props.region.height * props.contentHeight;

    const handleColor = "#6D5BD0";
    const borderColor = props.isSelected ? "#6D5BD0" : "#FFFFFF";

    return React.createElement(
      View,
      {
        style: {
          position: "absolute",
          left: overlayLeft,
          top: overlayTop,
          width: overlayWidth,
          height: overlayHeight,
          borderWidth: 2,
          borderColor: borderColor,
          backgroundColor: "rgba(109, 91, 208, 0.14)",
        },
      },
      React.createElement(
        View,
        Object.assign(
          {
            style: { flex: 1 },
          },
          dragResponder.panHandlers,
        ),
        React.createElement(
          View,
          {
            style: {
              position: "absolute",
              top: 6,
              left: 6,
              backgroundColor: handleColor,
              borderRadius: 999,
              paddingHorizontal: 8,
              paddingVertical: 3,
            },
          },
          React.createElement(
            Text,
            { style: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" } },
            props.region.label || "Crop",
          ),
        ),
      ),
      React.createElement(
        View,
        Object.assign(
          {
            style: [
              styles.cropCornerHandle,
              styles.cropCornerHandleTopLeft,
              {
                backgroundColor: handleColor,
                borderColor: "#FFFFFF",
              },
            ],
          },
          topLeftResponder.panHandlers,
        ),
      ),
      React.createElement(
        View,
        Object.assign(
          {
            style: [
              styles.cropCornerHandle,
              styles.cropCornerHandleTopRight,
              {
                backgroundColor: handleColor,
                borderColor: "#FFFFFF",
              },
            ],
          },
          topRightResponder.panHandlers,
        ),
      ),
      React.createElement(
        View,
        Object.assign(
          {
            style: [
              styles.cropCornerHandle,
              styles.cropCornerHandleBottomLeft,
              {
                backgroundColor: handleColor,
                borderColor: "#FFFFFF",
              },
            ],
          },
          bottomLeftResponder.panHandlers,
        ),
      ),
      React.createElement(
        View,
        Object.assign(
          {
            style: [
              styles.cropCornerHandle,
              styles.cropCornerHandleBottomRight,
              {
                backgroundColor: handleColor,
                borderColor: "#FFFFFF",
              },
            ],
          },
          bottomRightResponder.panHandlers,
        ),
      ),
    );
  };

  const ManualCropModal = function (props) {
    const theme = props.theme;
    const [regions, setRegions] = useState([]);
    const [selectedRegionId, setSelectedRegionId] = useState(null);
    const [aspectMode, setAspectMode] = useState("free");
    const [stageSize, setStageSize] = useState({ width: 1, height: 1 });
    const [measuredImageSize, setMeasuredImageSize] = useState({
      width:
        props.image && props.image.imageWidth ? props.image.imageWidth : 1200,
      height:
        props.image && props.image.imageHeight ? props.image.imageHeight : 1600,
    });

    const imageWidth = measuredImageSize.width || 1200;
    const imageHeight = measuredImageSize.height || 1600;

    useEffect(
      function () {
        if (props.visible && props.image) {
          const safeInitial = normalizeRegionList(props.initialRegions);
          setRegions(safeInitial);
          setSelectedRegionId(
            safeInitial.length > 0 ? safeInitial[0].id : null,
          );
          setAspectMode("free");
          setMeasuredImageSize({
            width: props.image.imageWidth || 1200,
            height: props.image.imageHeight || 1600,
          });
        }
      },
      [props.visible, props.image && props.image.id],
    );

    if (!props.visible || !props.image) return null;

    const imageRect = getContainRect(
      imageWidth,
      imageHeight,
      stageSize.width,
      stageSize.height,
    );

    const updateRegion = function (regionId, nextRegion) {
      setRegions(function (prev) {
        return normalizeRegionList(prev).map(function (r) {
          if (r.id !== regionId) return r;
          return normalizeRegion(
            Object.assign({}, r, nextRegion, {
              id: r.id,
              label: r.label,
            }),
          );
        });
      });
    };

    const AUTO_PLACE_GAP = 0.02;

    const regionsOverlap = function (a, b, gap) {
      const spacing = typeof gap === "number" ? gap : 0;
      return !(
        a.x + a.width + spacing <= b.x ||
        b.x + b.width + spacing <= a.x ||
        a.y + a.height + spacing <= b.y ||
        b.y + b.height + spacing <= a.y
      );
    };

    const isRegionSlotFree = function (candidate, existingRegions) {
      const safeCandidate = normalizeRegion(candidate);

      if (
        safeCandidate.x < 0 ||
        safeCandidate.y < 0 ||
        safeCandidate.x + safeCandidate.width > 1 ||
        safeCandidate.y + safeCandidate.height > 1
      ) {
        return false;
      }

      return !normalizeRegionList(existingRegions).some(function (region) {
        return regionsOverlap(safeCandidate, region, AUTO_PLACE_GAP);
      });
    };

    const findFreeRegionPosition = function (
      existingRegions,
      selectedId,
      width,
      height,
      activeAspectMode,
    ) {
      const regionList = normalizeRegionList(existingRegions);
      const selected = regionList.find(function (region) {
        return region.id === selectedId;
      });
      const dedupe = {};
      const candidates = [];

      const pushCandidate = function (x, y) {
        const normalized = normalizeRegion({
          id: "candidate",
          label: "candidate",
          x: x,
          y: y,
          width: width,
          height: height,
          aspectMode: activeAspectMode,
        });

        const key =
          normalized.x.toFixed(4) +
          "|" +
          normalized.y.toFixed(4) +
          "|" +
          normalized.width.toFixed(4) +
          "|" +
          normalized.height.toFixed(4);

        if (!dedupe[key]) {
          dedupe[key] = true;
          candidates.push(normalized);
        }
      };

      if (selected) {
        pushCandidate(
          selected.x,
          selected.y + selected.height + AUTO_PLACE_GAP,
        );
        pushCandidate(selected.x, selected.y - height - AUTO_PLACE_GAP);
        pushCandidate(selected.x + selected.width + AUTO_PLACE_GAP, selected.y);
        pushCandidate(selected.x - width - AUTO_PLACE_GAP, selected.y);
      }

      regionList
        .slice()
        .sort(function (a, b) {
          if (a.y !== b.y) return a.y - b.y;
          return a.x - b.x;
        })
        .forEach(function (region) {
          pushCandidate(region.x, region.y + region.height + AUTO_PLACE_GAP);
        });

      pushCandidate(0.08, 0.05);

      const yStep = Math.max(0.04, height / 3);
      const xStep = Math.max(0.04, width / 3);
      const maxX = Math.max(0, 1 - width);
      const maxY = Math.max(0, 1 - height);

      for (let y = 0.02; y <= maxY + 0.0001; y += yStep) {
        for (let x = 0.02; x <= maxX + 0.0001; x += xStep) {
          pushCandidate(x, y);
        }
      }

      for (let i = 0; i < candidates.length; i++) {
        if (isRegionSlotFree(candidates[i], regionList)) {
          return candidates[i];
        }
      }

      return normalizeRegion({
        id: "fallback",
        label: "fallback",
        x: 0.08,
        y: 0.05,
        width: width,
        height: height,
        aspectMode: activeAspectMode,
      });
    };

    const addRegion = function () {
      const safeRegionCount = visibleRegions.length;
      const id = makeId("crop", safeRegionCount + 1);
      const activeAspectMode = aspectMode;
      const aspectValue = getAspectValue(activeAspectMode);

      let width = 0.82;
      let height = 0.16;

      if (aspectValue) {
        width = 0.45;
        height = width / aspectValue;
        if (height > 0.5) {
          height = 0.5;
          width = height * aspectValue;
        }
      }

      const placement = findFreeRegionPosition(
        regions,
        selectedRegionId,
        width,
        height,
        activeAspectMode,
      );

      const newRegion = normalizeRegion({
        id: id,
        label: "Q" + (safeRegionCount + 1),
        x: placement.x,
        y: placement.y,
        width: placement.width,
        height: placement.height,
        aspectMode: activeAspectMode,
      });

      setRegions(function (prev) {
        return normalizeRegionList(prev).concat([newRegion]);
      });
      setSelectedRegionId(id);
    };

    const deleteSelected = function () {
      if (!selectedRegionId) return;
      setRegions(function (prev) {
        const filtered = normalizeRegionList(prev).filter(function (r) {
          return r.id !== selectedRegionId;
        });
        return normalizeRegionList(filtered);
      });
      setSelectedRegionId(null);
    };

    const saveRegions = function () {
      const safeRegions = normalizeRegionList(regions);

      if (safeRegions.length === 0) {
        showMessage("No Crops", "Please add at least one crop region.");
        return;
      }

      const cleaned = normalizeRegionList(safeRegions);

      props.onSave(cleaned);
    };

    const visibleRegions = normalizeRegionList(regions);
    const selectedRegion = visibleRegions.find(function (r) {
      return r.id === selectedRegionId;
    });

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: false,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: props.insetsTop || 0,
          title: "Manual Crop",
          showBack: true,
          onBack: props.onClose,
          showNext: true,
          onNext: saveRegions,
        }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            contentContainerStyle: {
              padding: 16,
              paddingBottom: 120 + (props.insetsBottom || 0),
            },
          },
          React.createElement(
            Text,
            {
              style: [
                styles.sectionDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Drag to move. Use corners to resize.",
          ),
          React.createElement(
            View,
            {
              style: [
                styles.cropStage,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.navyDark,
                },
              ],
              onLayout: function (e) {
                setStageSize({
                  width: e.nativeEvent.layout.width,
                  height: e.nativeEvent.layout.height,
                });
              },
            },
            React.createElement(Image, {
              source: { uri: props.image.uri },
              style: {
                position: "absolute",
                left: imageRect.x,
                top: imageRect.y,
                width: imageRect.width,
                height: imageRect.height,
              },
              resizeMode: "contain",
              onLoad: function (event) {
                const source =
                  event && event.nativeEvent ? event.nativeEvent.source : null;
                const nextWidth =
                  source && source.width ? source.width : imageWidth;
                const nextHeight =
                  source && source.height ? source.height : imageHeight;

                if (
                  nextWidth > 0 &&
                  nextHeight > 0 &&
                  (nextWidth !== measuredImageSize.width ||
                    nextHeight !== measuredImageSize.height)
                ) {
                  const nextSize = { width: nextWidth, height: nextHeight };
                  setMeasuredImageSize(nextSize);
                  if (props.onImageSizeDetected) {
                    props.onImageSizeDetected(nextSize);
                  }
                }
              },
            }),
            visibleRegions.map(function (region) {
              return React.createElement(CropRegionOverlay, {
                key: region.id,
                region: region,
                contentLeft: imageRect.x,
                contentTop: imageRect.y,
                contentWidth: imageRect.width,
                contentHeight: imageRect.height,
                isSelected: selectedRegionId === region.id,
                onPress: function () {
                  setSelectedRegionId(region.id);
                },
                onChange: function (next) {
                  updateRegion(region.id, next);
                },
                aspectMode: region.aspectMode || aspectMode,
                themeAccentColor: theme.colors.accent,
              });
            }),
          ),
          React.createElement(
            View,
            { style: styles.aspectWrap },
            ["free", "square", "4:3", "3:4"].map(function (mode) {
              const selected = aspectMode === mode;
              return React.createElement(
                TouchableOpacity,
                {
                  key: mode,
                  style: [
                    styles.aspectButton,
                    {
                      backgroundColor: selected
                        ? theme.colors.primary
                        : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setAspectMode(mode);
                    if (selectedRegionId) {
                      setRegions(function (prev) {
                        return normalizeRegionList(prev).map(function (region) {
                          if (region.id !== selectedRegionId) return region;
                          return Object.assign({}, region, {
                            aspectMode: mode,
                          });
                        });
                      });
                    }
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color: selected ? "#FFFFFF" : theme.colors.textPrimary,
                      fontWeight: "700",
                    },
                  },
                  mode === "free" ? "Free" : mode,
                ),
              );
            }),
          ),
          React.createElement(
            View,
            { style: styles.cropActionRow },
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.cropActionButton,
                  { backgroundColor: theme.colors.accent },
                ],
                onPress: addRegion,
              },
              React.createElement(MaterialIcons, {
                name: "add-box",
                size: 18,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.cropActionButtonText },
                "Add Region",
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.cropActionButton,
                  { backgroundColor: theme.colors.error },
                ],
                onPress: deleteSelected,
              },
              React.createElement(MaterialIcons, {
                name: "delete",
                size: 18,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.cropActionButtonText },
                "Delete Selected",
              ),
            ),
          ),
          selectedRegion
            ? React.createElement(
                View,
                {
                  style: [
                    styles.cropInfoCard,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.previewTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Selected Region Preview",
                ),
                React.createElement(CroppedImageView, {
                  uri: props.image.uri,
                  cropMeta: selectedRegion,
                  imageWidth: imageWidth,
                  imageHeight: imageHeight,
                  width: 300,
                  borderRadius: 12,
                }),
              )
            : null,
          visibleRegions.length > 0
            ? React.createElement(
                View,
                { style: { marginTop: 16 } },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.previewTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "All Crops",
                ),
                React.createElement(
                  View,
                  { style: styles.imageGrid },
                  visibleRegions.map(function (region) {
                    return React.createElement(
                      TouchableOpacity,
                      {
                        key: region.id,
                        style: styles.imageGridItem,
                        onPress: function () {
                          setSelectedRegionId(region.id);
                        },
                      },
                      React.createElement(CroppedImageView, {
                        uri: props.image.uri,
                        cropMeta: region,
                        imageWidth: imageWidth,
                        imageHeight: imageHeight,
                        width: 108,
                        height: 100,
                        borderRadius: 10,
                      }),
                      React.createElement(
                        View,
                        {
                          style: [
                            styles.cropThumbLabel,
                            {
                              backgroundColor:
                                selectedRegionId === region.id
                                  ? theme.colors.accent
                                  : "rgba(36, 48, 79, 0.78)",
                            },
                          ],
                        },
                        React.createElement(
                          Text,
                          {
                            style: {
                              color: "#FFFFFF",
                              fontSize: 11,
                              fontWeight: "700",
                            },
                          },
                          region.label,
                        ),
                      ),
                    );
                  }),
                ),
              )
            : null,
        ),
        React.createElement(
          View,
          {
            style: [
              styles.bottomNavBar,
              {
                backgroundColor: theme.colors.card,
                borderTopColor: theme.colors.border,
                paddingBottom: 12 + (props.insetsBottom || 0),
              },
            ],
          },
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.smallNavButton,
                { backgroundColor: theme.colors.primary },
              ],
              onPress: saveRegions,
            },
            React.createElement(MaterialIcons, {
              name: "save",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.smallNavButtonText },
              "Save Crops",
            ),
          ),
        ),
      ),
    );
  };

  const AnswerEditModal = function (props) {
    const correctAnswerState = useState(
      props.question && props.question.correctAnswer
        ? props.question.correctAnswer
        : "A",
    );
    const correctAnswer = correctAnswerState[0];
    const setCorrectAnswer = correctAnswerState[1];

    const questionTextState = useState(
      props.question && props.question.questionText
        ? props.question.questionText
        : "",
    );
    const questionText = questionTextState[0];
    const setQuestionText = questionTextState[1];

    const answerSourceState = useState(
      props.question && props.question.answerSource
        ? props.question.answerSource
        : "Manual / Default",
    );
    const answerSource = answerSourceState[0];
    const setAnswerSource = answerSourceState[1];

    useEffect(
      function () {
        setCorrectAnswer(
          props.question && props.question.correctAnswer
            ? props.question.correctAnswer
            : "A",
        );
        setQuestionText(
          props.question && props.question.questionText
            ? props.question.questionText
            : "",
        );
        setAnswerSource(
          props.question && props.question.answerSource
            ? props.question.answerSource
            : "Manual / Default",
        );
      },
      [props.question],
    );

    if (!props.visible || !props.question) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              {
                style: [
                  styles.modalTitle,
                  { color: props.theme.colors.primary },
                ],
              },
              "Edit Question",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: props.theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            ScrollView,
            { style: { maxHeight: 520 } },
            React.createElement(CroppedImageView, {
              uri: props.question.imageUri,
              cropMeta: props.question.cropMeta,
              imageWidth: props.question.imageWidth,
              imageHeight: props.question.imageHeight,
              width: 300,
              borderRadius: 12,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.answerChooserLabel,
                  { color: props.theme.colors.textPrimary, marginTop: 14 },
                ],
              },
              "Question text / OCR",
            ),
            React.createElement(TextInput, {
              style: [
                styles.ocrInput,
                {
                  borderColor: props.theme.colors.border,
                  color: props.theme.colors.textPrimary,
                  backgroundColor: props.theme.colors.background,
                },
              ],
              placeholder: "Paste or edit question text here",
              placeholderTextColor: props.theme.colors.textSecondary,
              multiline: true,
              value: questionText,
              onChangeText: setQuestionText,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.answerChooserLabel,
                  { color: props.theme.colors.textPrimary, marginTop: 14 },
                ],
              },
              "Answer source",
            ),
            React.createElement(TextInput, {
              style: [
                styles.titleInput,
                {
                  borderColor: props.theme.colors.border,
                  color: props.theme.colors.textPrimary,
                  backgroundColor: props.theme.colors.card,
                  marginBottom: 14,
                },
              ],
              placeholder: "Example: Uploaded Mark Scheme / Manual",
              placeholderTextColor: props.theme.colors.textSecondary,
              value: answerSource,
              onChangeText: setAnswerSource,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.answerChooserLabel,
                  { color: props.theme.colors.textPrimary, marginTop: 0 },
                ],
              },
              "Choose answer value",
            ),
            ["A", "B", "C", "D"].map(function (option) {
              const selected = correctAnswer === option;
              return React.createElement(
                TouchableOpacity,
                {
                  key: option,
                  style: [
                    styles.answerChoiceButton,
                    {
                      backgroundColor: selected
                        ? props.theme.colors.primary
                        : props.theme.colors.background,
                      borderColor: props.theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setCorrectAnswer(option);
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.answerChoiceButtonText,
                      {
                        color: selected
                          ? "#FFFFFF"
                          : props.theme.colors.textPrimary,
                      },
                    ],
                  },
                  "Option " + option,
                ),
              );
            }),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                { backgroundColor: props.theme.colors.primary, marginTop: 14 },
              ],
              onPress: function () {
                props.onSave({
                  correctAnswer: correctAnswer,
                  answerValue: correctAnswer,
                  answerSource: answerSource || "Manual / Default",
                  questionText: questionText,
                  ocrStatus:
                    questionText && questionText.trim() ? "edited" : "pending",
                });
                props.onClose();
              },
            },
            React.createElement(MaterialIcons, {
              name: "check",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Save Question",
            ),
          ),
        ),
      ),
    );
  };

  const MarkSchemeAssistModal = function (props) {
    const [draftAnswers, setDraftAnswers] = useState([]);
    const theme = props.theme;

    useEffect(
      function () {
        if (!props.visible) return;
        setDraftAnswers(buildMarkSchemeDraftAnswers(props.questions || []));
      },
      [props.visible, props.questions],
    );

    if (!props.visible) return null;

    const updateDraftAnswer = function (questionId, nextAnswer) {
      setDraftAnswers(function (prev) {
        return (prev || []).map(function (item) {
          if (item.questionId !== questionId) return item;
          return Object.assign({}, item, { answerValue: nextAnswer });
        });
      });
    };

    const applyDraftAnswers = function () {
      props.onApply(convertMarkSchemeDraftToAnswerMap(draftAnswers));
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              "Match Mark Scheme Image",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary, marginBottom: 14 },
              ],
            },
            "The uploaded image is attached as evidence. If OCR text is unavailable in this build, confirm the answer letters below. You can also paste scanned text on the review page for faster auto-fill.",
          ),
          props.images && props.images.length > 0
            ? React.createElement(
                ScrollView,
                {
                  horizontal: true,
                  showsHorizontalScrollIndicator: false,
                  style: { marginBottom: 12, maxHeight: 160 },
                },
                (props.images || []).map(function (image, index) {
                  return React.createElement(
                    View,
                    { key: image.id || index, style: { marginRight: 12 } },
                    React.createElement(CroppedImageView, {
                      uri: image.uri,
                      width: 120,
                      height: 140,
                      borderRadius: 12,
                    }),
                  );
                }),
              )
            : null,
          React.createElement(
            ScrollView,
            { style: { maxHeight: 360 } },
            (props.questions || []).map(function (question, index) {
              const currentAnswer =
                (
                  (draftAnswers || []).find(function (item) {
                    return item.questionId === question.id;
                  }) || {}
                ).answerValue || "";

              return React.createElement(
                View,
                {
                  key: question.id,
                  style: [
                    styles.markSchemeRow,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.markSchemeRowTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Q" +
                    String(
                      typeof question.originalQuestionNumber === "number"
                        ? question.originalQuestionNumber
                        : index + 1,
                    ),
                ),
                React.createElement(
                  View,
                  { style: styles.markSchemeAnswerButtons },
                  ["A", "B", "C", "D"].map(function (option) {
                    const selected = currentAnswer === option;
                    return React.createElement(
                      TouchableOpacity,
                      {
                        key: question.id + "_" + option,
                        style: [
                          styles.markSchemeAnswerButton,
                          {
                            backgroundColor: selected
                              ? theme.colors.primary
                              : theme.colors.card,
                            borderColor: theme.colors.border,
                          },
                        ],
                        onPress: function () {
                          updateDraftAnswer(question.id, option);
                        },
                      },
                      React.createElement(
                        Text,
                        {
                          style: {
                            color: selected
                              ? "#FFFFFF"
                              : theme.colors.textPrimary,
                            fontWeight: "800",
                          },
                        },
                        option,
                      ),
                    );
                  }),
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.markSchemeClearButton,
                        {
                          backgroundColor: theme.colors.error,
                          borderColor: theme.colors.error,
                        },
                      ],
                      onPress: function () {
                        updateDraftAnswer(question.id, "");
                      },
                    },
                    React.createElement(MaterialIcons, {
                      name: "close",
                      size: 16,
                      color: "#FFFFFF",
                    }),
                  ),
                ),
              );
            }),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                {
                  backgroundColor: theme.colors.primary,
                  marginTop: 14,
                  marginBottom: 0,
                },
              ],
              onPress: applyDraftAnswers,
            },
            React.createElement(MaterialIcons, {
              name: "check-circle",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Apply Answers To Review",
            ),
          ),
        ),
      ),
    );
  };

  const rebuildExtractedQuestionsFromImages = function (
    images,
    existingQuestions,
    quizIdSeed,
  ) {
    const previousQuestionMap = {};

    (existingQuestions || []).forEach(function (question) {
      const normalizedQuestion = normalizeQuestion(
        question,
        quizIdSeed || question.quizId || "",
        0,
      );
      const key =
        normalizedQuestion.sourceQuestionId ||
        normalizedQuestion.sourceCropId ||
        normalizedQuestion.id;

      if (key && !previousQuestionMap[key]) {
        previousQuestionMap[key] = normalizedQuestion;
      }
    });

    const finalQuestions = [];
    let runningIndex = 0;

    (images || []).forEach(function (image) {
      const regions = normalizeRegionList(image ? image.cropRegions : []);
      if (regions.length === 0) return;

      regions.forEach(function (region, cropIndex) {
        runningIndex++;
        const immutableSourceCropId = region.sourceCropId || region.id;
        const existingQuestion =
          previousQuestionMap[immutableSourceCropId] ||
          previousQuestionMap[region.id] ||
          null;
        const stableOriginalQuestionNumber = existingQuestion
          ? existingQuestion.originalQuestionNumber
          : runningIndex;

        finalQuestions.push(
          normalizeQuestion(
            Object.assign({}, existingQuestion || {}, {
              id:
                (existingQuestion && existingQuestion.id) ||
                immutableSourceCropId,
              sourceQuestionId:
                (existingQuestion && existingQuestion.sourceQuestionId) ||
                immutableSourceCropId,
              sourceCropId: immutableSourceCropId,
              quizId:
                quizIdSeed ||
                (existingQuestion ? existingQuestion.quizId : "") ||
                "",
              questionNumber: runningIndex,
              originalQuestionNumber: stableOriginalQuestionNumber,
              imageUri: image.uri,
              imageWidth: image.imageWidth || 1200,
              imageHeight: image.imageHeight || 1600,
              cropMeta: normalizeRegion({
                id: region.id,
                sourceCropId: immutableSourceCropId,
                label: region.label,
                x: region.x,
                y: region.y,
                width: region.width,
                height: region.height,
                aspectMode: region.aspectMode || "free",
              }),
              optionA:
                existingQuestion && existingQuestion.optionA
                  ? existingQuestion.optionA
                  : "Option A",
              optionB:
                existingQuestion && existingQuestion.optionB
                  ? existingQuestion.optionB
                  : "Option B",
              optionC:
                existingQuestion && existingQuestion.optionC
                  ? existingQuestion.optionC
                  : "Option C",
              optionD:
                existingQuestion && existingQuestion.optionD
                  ? existingQuestion.optionD
                  : "Option D",
              correctAnswer:
                existingQuestion && existingQuestion.correctAnswer
                  ? existingQuestion.correctAnswer
                  : "A",
              questionText:
                existingQuestion && existingQuestion.questionText
                  ? existingQuestion.questionText
                  : "",
              ocrStatus:
                existingQuestion && existingQuestion.ocrStatus
                  ? existingQuestion.ocrStatus
                  : "pending",
              sourceType: image.sourceType || "image",
              sourceFileName: image.sourceFileName || "",
              sourceDocumentId: image.sourceDocumentId || "",
              sourcePage:
                typeof image.sourcePage === "number" ? image.sourcePage : 0,
              cropIndex: cropIndex,
            }),
            quizIdSeed ||
              (existingQuestion ? existingQuestion.quizId : "") ||
              "",
            runningIndex - 1,
          ),
        );
      });
    });

    return finalQuestions;
  };

  const UNFILED_FOLDER_ID = "__unfiled__";

  const normalizeFolderName = function (value) {
    return value ? String(value).trim() : "";
  };

  const buildSystemUnfiledFolder = function () {
    return {
      id: UNFILED_FOLDER_ID,
      name: "Unfiled",
      isSystem: true,
      createdAt: new Date(0).toISOString(),
    };
  };

  const getFolderIdForQuiz = function (quiz) {
    const rawId = quiz && quiz.folderId ? String(quiz.folderId) : "";
    return rawId || UNFILED_FOLDER_ID;
  };

  const buildFolderListFromData = function (foldersData, quizzes) {
    const folderMap = {};
    const addFolder = function (folder) {
      if (!folder) return;
      const rawName = normalizeFolderName(folder.name);
      const safeId = folder.id ? String(folder.id) : "";
      const normalizedName = rawName || "Untitled Folder";
      const normalizedId =
        safeId || normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, "_");

      if (normalizedId === UNFILED_FOLDER_ID) return;

      if (!folderMap[normalizedId]) {
        folderMap[normalizedId] = {
          id: normalizedId,
          name: normalizedName,
          createdAt: folder.createdAt || new Date().toISOString(),
          isSystem: false,
        };
      }
    };

    (foldersData || []).forEach(addFolder);

    (quizzes || []).forEach(function (quiz) {
      const folderId = quiz && quiz.folderId ? String(quiz.folderId) : "";
      const folderName =
        quiz && quiz.folderName ? normalizeFolderName(quiz.folderName) : "";

      if (folderId && folderId !== UNFILED_FOLDER_ID) {
        addFolder({
          id: folderId,
          name: folderName || folderId,
          createdAt: quiz.createdAt || new Date().toISOString(),
        });
      }
    });

    return [buildSystemUnfiledFolder()].concat(
      Object.keys(folderMap)
        .map(function (key) {
          return folderMap[key];
        })
        .sort(function (a, b) {
          return String(a.name || "").localeCompare(String(b.name || ""));
        }),
    );
  };

  const getFolderObjectForQuiz = function (quiz, folders) {
    const folderId = getFolderIdForQuiz(quiz);
    const folderList = folders || [];
    const matched = folderList.find(function (folder) {
      return folder.id === folderId;
    });

    if (matched) return matched;
    if (folderId === UNFILED_FOLDER_ID) return buildSystemUnfiledFolder();

    return {
      id: folderId,
      name: normalizeFolderName(quiz && quiz.folderName) || "Unfiled",
      isSystem: false,
      createdAt:
        quiz && quiz.createdAt ? quiz.createdAt : new Date().toISOString(),
    };
  };

  const getFolderNameForQuiz = function (quiz, folders) {
    return getFolderObjectForQuiz(quiz, folders).name;
  };

  const getRecentQuizzes = function (quizList, limit) {
    const safeLimit = typeof limit === "number" ? limit : 8;
    return (quizList || [])
      .slice()
      .sort(function (a, b) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, safeLimit);
  };

  const formatDateOnly = function (dateValue) {
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "";
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear());
      return day + "/" + month + "/" + year;
    } catch (e) {
      return "";
    }
  };

  const getDaysInMonth = function (year, monthIndex) {
    const safeYear = year || new Date().getFullYear();
    const safeMonthIndex =
      typeof monthIndex === "number" && monthIndex >= 0 && monthIndex <= 11
        ? monthIndex
        : new Date().getMonth();
    return new Date(safeYear, safeMonthIndex + 1, 0).getDate();
  };

  const parseDateToParts = function (dateValue) {
    try {
      const parsed = dateValue ? new Date(dateValue) : new Date();
      if (isNaN(parsed.getTime())) {
        const now = new Date();
        return {
          day: now.getDate(),
          monthIndex: now.getMonth(),
          year: now.getFullYear(),
        };
      }

      return {
        day: parsed.getDate(),
        monthIndex: parsed.getMonth(),
        year: parsed.getFullYear(),
      };
    } catch (e) {
      const now = new Date();
      return {
        day: now.getDate(),
        monthIndex: now.getMonth(),
        year: now.getFullYear(),
      };
    }
  };

  const buildCountdownYearOptions = function (selectedYear) {
    const currentYear = new Date().getFullYear();
    const startYear = Math.min(
      currentYear - 1,
      (selectedYear || currentYear) - 3,
    );
    const endYear = Math.max(
      currentYear + 10,
      (selectedYear || currentYear) + 3,
    );
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const formatCountdownDateParts = function (parts) {
    if (!parts) return "";
    const safeDay = String(parts.day || 1).padStart(2, "0");
    const safeMonth = String((parts.monthIndex || 0) + 1).padStart(2, "0");
    const safeYear = String(parts.year || new Date().getFullYear());
    return safeDay + "/" + safeMonth + "/" + safeYear;
  };

  const CountdownDatePickerModal = function (props) {
    const theme = props.theme;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const pickerPartsState = useState(
      props.initialParts || parseDateToParts(new Date().toISOString()),
    );
    const pickerParts = pickerPartsState[0];
    const setPickerParts = pickerPartsState[1];

    useEffect(
      function () {
        setPickerParts(
          props.initialParts || parseDateToParts(new Date().toISOString()),
        );
      },
      [
        props.visible,
        props.initialParts ? props.initialParts.day : 0,
        props.initialParts ? props.initialParts.monthIndex : 0,
        props.initialParts ? props.initialParts.year : 0,
      ],
    );

    if (!props.visible) return null;

    const maxDay = getDaysInMonth(pickerParts.year, pickerParts.monthIndex);
    const safeDay = Math.min(pickerParts.day || 1, maxDay);
    const safeParts = {
      day: safeDay,
      monthIndex: pickerParts.monthIndex,
      year: pickerParts.year,
    };
    const yearOptions = buildCountdownYearOptions(safeParts.year);
    const dayOptions = [];
    for (let day = 1; day <= maxDay; day++) {
      dayOptions.push(day);
    }

    const updateParts = function (nextPartial) {
      setPickerParts(function (prev) {
        const next = Object.assign({}, prev, nextPartial);
        const nextMaxDay = getDaysInMonth(next.year, next.monthIndex);
        if (next.day > nextMaxDay) {
          next.day = nextMaxDay;
        }
        return next;
      });
    };

    const renderOptionChip = function (label, selected, onPress) {
      return React.createElement(
        TouchableOpacity,
        {
          key: label,
          style: [
            styles.countdownPickerChip,
            {
              backgroundColor: selected
                ? theme.colors.primary
                : theme.colors.background,
              borderColor: selected
                ? theme.colors.primary
                : theme.colors.border,
            },
          ],
          onPress: onPress,
        },
        React.createElement(
          Text,
          {
            style: [
              styles.countdownPickerChipText,
              { color: selected ? "#FFFFFF" : theme.colors.textPrimary },
            ],
          },
          String(label),
        ),
      );
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              "Choose Exam Date",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Choose the day, month and year. When you save a new date, the countdown card updates automatically and recalculates the remaining days.",
          ),
          React.createElement(
            View,
            {
              style: [
                styles.countdownSelectedDateBanner,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "event",
              size: 20,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.countdownSelectedDateText,
                  { color: theme.colors.textPrimary },
                ],
              },
              formatCountdownDateParts(safeParts),
            ),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownPickerSectionTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Month",
          ),
          React.createElement(
            ScrollView,
            {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: { marginBottom: 12 },
              contentContainerStyle: { paddingRight: 8 },
            },
            monthNames.map(function (monthLabel, monthIndex) {
              return renderOptionChip(
                monthLabel,
                safeParts.monthIndex === monthIndex,
                function () {
                  updateParts({ monthIndex: monthIndex });
                },
              );
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownPickerSectionTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Day",
          ),
          React.createElement(
            ScrollView,
            {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: { marginBottom: 12 },
              contentContainerStyle: { paddingRight: 8 },
            },
            dayOptions.map(function (day) {
              return renderOptionChip(day, safeParts.day === day, function () {
                updateParts({ day: day });
              });
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownPickerSectionTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Year",
          ),
          React.createElement(
            ScrollView,
            {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: { marginBottom: 2 },
              contentContainerStyle: { paddingRight: 8 },
            },
            yearOptions.map(function (year) {
              return renderOptionChip(
                year,
                safeParts.year === year,
                function () {
                  updateParts({ year: year });
                },
              );
            }),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                {
                  backgroundColor: theme.colors.primary,
                  marginTop: 16,
                  marginBottom: 0,
                },
              ],
              onPress: function () {
                props.onConfirm(safeParts);
              },
            },
            React.createElement(MaterialIcons, {
              name: "check-circle",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Use This Date",
            ),
          ),
        ),
      ),
    );
  };

  const startOfLocalDay = function (dateValue) {
    const d = new Date(dateValue);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const getCountdownDisplayData = function (targetDateValue, nowValue) {
    const now = nowValue ? new Date(nowValue) : new Date();
    const today = startOfLocalDay(now);
    const target = startOfLocalDay(targetDateValue);
    const diffMs = target.getTime() - today.getTime();
    const rawDays = Math.ceil(diffMs / 86400000);
    const safeDays = rawDays < 0 ? 0 : rawDays;

    return {
      daysRemaining: safeDays,
      isDueToday: rawDays === 0,
      isPast: rawDays < 0,
      targetDateLabel: formatDateOnly(target),
    };
  };

  const CountdownProgressRing = function (props) {
    const size = props.size || 118;
    const capSize = Math.max(14, Math.round(size * 0.17));

    return React.createElement(
      View,
      {
        style: {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: props.fillColor || "#DC2626",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
      },
      React.createElement(View, {
        style: {
          position: "absolute",
          top: 6,
          right: 6,
          width: capSize,
          height: capSize,
          borderRadius: capSize / 2,
          backgroundColor: props.progressColor || periwinkle,
        },
      }),
      React.createElement(
        Text,
        {
          style: {
            color: "#FFFFFF",
            fontSize: size >= 120 ? 42 : 30,
            fontWeight: "900",
            lineHeight: size >= 120 ? 44 : 34,
          },
        },
        String(props.daysRemaining),
      ),
      React.createElement(
        Text,
        {
          style: {
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: "800",
            marginTop: 2,
          },
        },
        props.daysLabel || "Days",
      ),
    );
  };

  const CountdownEditorModal = function (props) {
    const theme = props.theme;
    const countdown = props.countdown || null;
    const titleState = useState(
      countdown && countdown.title ? countdown.title : "",
    );
    const title = titleState[0];
    const setTitle = titleState[1];
    const selectedDatePartsState = useState(
      countdown && countdown.targetDate
        ? parseDateToParts(countdown.targetDate)
        : parseDateToParts(new Date().toISOString()),
    );
    const selectedDateParts = selectedDatePartsState[0];
    const setSelectedDateParts = selectedDatePartsState[1];
    const showDatePickerState = useState(false);
    const showDatePicker = showDatePickerState[0];
    const setShowDatePicker = showDatePickerState[1];

    useEffect(
      function () {
        setTitle(countdown && countdown.title ? countdown.title : "");
        setSelectedDateParts(
          countdown && countdown.targetDate
            ? parseDateToParts(countdown.targetDate)
            : parseDateToParts(new Date().toISOString()),
        );
        setShowDatePicker(false);
      },
      [props.visible, countdown ? countdown.id : ""],
    );

    if (!props.visible) return null;

    const selectedDateLabel = formatCountdownDateParts(selectedDateParts);

    const saveCountdown = function () {
      const trimmedTitle = title ? String(title).trim() : "";
      const day =
        selectedDateParts && selectedDateParts.day ? selectedDateParts.day : 0;
      const monthIndex =
        selectedDateParts && typeof selectedDateParts.monthIndex === "number"
          ? selectedDateParts.monthIndex
          : -1;
      const year =
        selectedDateParts && selectedDateParts.year
          ? selectedDateParts.year
          : 0;

      if (!trimmedTitle) {
        showMessage(
          "Missing Title",
          "Please enter the exam name or countdown title.",
        );
        return;
      }

      if (!day || monthIndex < 0 || !year) {
        showMessage(
          "Invalid Date",
          "Please choose a valid exam date from the calendar picker.",
        );
        return;
      }

      const parsed = new Date(year, monthIndex, day);

      if (
        isNaN(parsed.getTime()) ||
        parsed.getDate() !== day ||
        parsed.getMonth() !== monthIndex ||
        parsed.getFullYear() !== year
      ) {
        showMessage("Invalid Date", "The selected date is not valid.");
        return;
      }

      props.onSave({
        id:
          countdown && countdown.id
            ? countdown.id
            : makeId("countdown", "item"),
        title: trimmedTitle,
        targetDate: parsed.toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt:
          countdown && countdown.createdAt
            ? countdown.createdAt
            : new Date().toISOString(),
      });
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              countdown ? "Edit Countdown" : "Add Countdown",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Add the exam title and choose the exam date from the calendar selector. If you edit to a new date later, the countdown updates automatically and recalculates the new remaining days.",
          ),
          React.createElement(TextInput, {
            style: [
              styles.titleInput,
              {
                borderColor: theme.colors.border,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.card,
                marginBottom: 14,
              },
            ],
            placeholder: "Example: Physics Paper 2",
            placeholderTextColor: theme.colors.textSecondary,
            value: title,
            onChangeText: setTitle,
          }),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.countdownDateFieldButton,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                },
              ],
              onPress: function () {
                setShowDatePicker(true);
              },
            },
            React.createElement(
              View,
              { style: { flex: 1, paddingRight: 12 } },
              React.createElement(
                Text,
                {
                  style: [
                    styles.countdownDateFieldLabel,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Exam date",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.countdownDateFieldValue,
                    { color: theme.colors.textPrimary },
                  ],
                },
                selectedDateLabel || "Choose a date",
              ),
            ),
            React.createElement(MaterialIcons, {
              name: "calendar-month",
              size: 24,
              color: theme.colors.accent,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownInputHint,
                { color: theme.colors.textSecondary },
              ],
            },
            "Tap the date field to open the calendar-style selector and choose a new date.",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                { backgroundColor: theme.colors.primary, marginTop: 14 },
              ],
              onPress: saveCountdown,
            },
            React.createElement(MaterialIcons, {
              name: "save",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              countdown ? "Save Changes" : "Save Countdown",
            ),
          ),
        ),
      ),
      React.createElement(CountdownDatePickerModal, {
        visible: showDatePicker,
        initialParts: selectedDateParts,
        onClose: function () {
          setShowDatePicker(false);
        },
        onConfirm: function (nextParts) {
          setSelectedDateParts(nextParts);
          setShowDatePicker(false);
        },
        theme: theme,
        insetsTop: props.insetsTop,
        insetsBottom: props.insetsBottom,
      }),
    );
  };

  const CountdownActionMenuModal = function (props) {
    const theme = props.theme;

    if (!props.visible || !props.countdown) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.modalOverlay,
            { paddingTop: props.insetsTop, paddingBottom: props.insetsBottom },
          ],
          activeOpacity: 1,
          onPress: props.onClose,
        },
        React.createElement(
          View,
          {
            style: [
              styles.countdownMenuCard,
              {
                backgroundColor: theme.colors.navyDark,
                borderColor: "rgba(255,255,255,0.08)",
              },
            ],
          },
          React.createElement(
            TouchableOpacity,
            {
              style: styles.countdownMenuItem,
              onPress: function () {
                props.onEdit(props.countdown);
              },
            },
            React.createElement(
              Text,
              { style: styles.countdownMenuItemText },
              "Edit",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [styles.countdownMenuItem, styles.countdownMenuItemLast],
              onPress: function () {
                props.onDelete(props.countdown);
              },
            },
            React.createElement(
              Text,
              { style: styles.countdownMenuItemText },
              "Delete",
            ),
          ),
        ),
      ),
    );
  };

  const FolderPickerModal = function (props) {
    const theme = props.theme;
    const folders = props.folders || [];

    if (!props.visible) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            {
              paddingTop: props.insetsTop || 0,
              paddingBottom: props.insetsBottom || 0,
            },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              props.title || "Save in folder",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Choose one folder only. If you leave it without a folder, the quiz will be saved in Unfiled.",
          ),
          React.createElement(
            ScrollView,
            { style: { maxHeight: 320 }, showsVerticalScrollIndicator: false },
            folders.map(function (folder) {
              const selected = props.selectedFolderId === folder.id;

              return React.createElement(
                TouchableOpacity,
                {
                  key: folder.id,
                  style: [
                    styles.folderPickerItem,
                    {
                      backgroundColor: selected
                        ? theme.colors.primary
                        : theme.colors.background,
                      borderColor: selected
                        ? theme.colors.primary
                        : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    props.onSelect(folder);
                  },
                },
                React.createElement(
                  View,
                  { style: { flex: 1, paddingRight: 10 } },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.folderPickerItemTitle,
                        {
                          color: selected
                            ? "#FFFFFF"
                            : theme.colors.textPrimary,
                        },
                      ],
                    },
                    folder.name,
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.folderPickerItemMeta,
                        {
                          color: selected
                            ? "rgba(255,255,255,0.9)"
                            : theme.colors.textSecondary,
                        },
                      ],
                    },
                    folder.isSystem ? "Default folder" : "Custom folder",
                  ),
                ),
                selected
                  ? React.createElement(MaterialIcons, {
                      name: "check-circle",
                      size: 22,
                      color: "#FFFFFF",
                    })
                  : React.createElement(MaterialIcons, {
                      name: "chevron-right",
                      size: 22,
                      color: theme.colors.textSecondary,
                    }),
              );
            }),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                {
                  backgroundColor: theme.colors.accent,
                  marginTop: 14,
                  marginBottom: 0,
                },
              ],
              onPress: props.onCreateNew,
            },
            React.createElement(MaterialIcons, {
              name: "create-new-folder",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "+ Create New Folder",
            ),
          ),
        ),
      ),
    );
  };

  const FolderNameEditorModal = function (props) {
    const theme = props.theme;
    const nameState = useState("");
    const folderName = nameState[0];
    const setFolderName = nameState[1];

    useEffect(
      function () {
        if (props.visible) {
          setFolderName(props.initialValue || "");
        }
      },
      [props.visible, props.initialValue],
    );

    if (!props.visible) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            {
              paddingTop: props.insetsTop || 0,
              paddingBottom: props.insetsBottom || 0,
            },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              props.title || "Create Folder",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Keep the structure flat and mobile-friendly. Use a short folder name like Chemistry or Trial Papers.",
          ),
          React.createElement(TextInput, {
            style: [
              styles.titleInput,
              {
                borderColor: theme.colors.border,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.card,
                marginBottom: 14,
              },
            ],
            placeholder: "Enter folder name",
            placeholderTextColor: theme.colors.textSecondary,
            value: folderName,
            onChangeText: setFolderName,
          }),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                { backgroundColor: theme.colors.primary, marginBottom: 0 },
              ],
              onPress: function () {
                props.onSave(folderName);
              },
            },
            React.createElement(MaterialIcons, {
              name: "create-new-folder",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Save Folder",
            ),
          ),
        ),
      ),
    );
  };

  const FolderDetailModal = function (props) {
    const theme = props.theme;
    const folder = props.folder;
    const searchState = useState("");
    const searchText = searchState[0];
    const setSearchText = searchState[1];
    const sortState = useState("latest");
    const sortMode = sortState[0];
    const setSortMode = sortState[1];

    useEffect(
      function () {
        if (props.visible) {
          setSearchText("");
          setSortMode("latest");
        }
      },
      [props.visible, folder ? folder.id : ""],
    );

    if (!props.visible || !folder) return null;

    const safeSearch = String(searchText || "")
      .trim()
      .toLowerCase();

    const filteredQuizzes = (props.quizzes || [])
      .filter(function (quiz) {
        if (getFolderIdForQuiz(quiz) !== folder.id) return false;
        if (!safeSearch) return true;
        return (
          String(quiz.title || "")
            .toLowerCase()
            .indexOf(safeSearch) >= 0
        );
      })
      .slice()
      .sort(function (a, b) {
        if (sortMode === "title") {
          return String(a.title || "").localeCompare(String(b.title || ""));
        }
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: false,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: props.insetsTop || 0,
          title: folder.name,
          showBack: true,
          onBack: props.onClose,
          showNext: false,
        }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            contentContainerStyle: {
              padding: 16,
              paddingBottom: 110 + (props.insetsBottom || 0),
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.folderDetailHeaderCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.folderDetailTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              folder.name,
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.folderDetailMeta,
                  { color: theme.colors.textSecondary },
                ],
              },
              filteredQuizzes.length + " quiz(es) in this folder",
            ),
            React.createElement(TextInput, {
              style: [
                styles.titleInput,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.textPrimary,
                  backgroundColor: theme.colors.background,
                  marginBottom: 12,
                },
              ],
              placeholder: "Search quizzes in this folder",
              placeholderTextColor: theme.colors.textSecondary,
              value: searchText,
              onChangeText: setSearchText,
            }),
            React.createElement(
              View,
              { style: styles.sortToggleRow },
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.sortToggleButton,
                    {
                      backgroundColor:
                        sortMode === "latest"
                          ? theme.colors.primary
                          : theme.colors.background,
                      borderColor:
                        sortMode === "latest"
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setSortMode("latest");
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color:
                        sortMode === "latest"
                          ? "#FFFFFF"
                          : theme.colors.textPrimary,
                      fontWeight: "700",
                    },
                  },
                  "Latest",
                ),
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.sortToggleButton,
                    {
                      backgroundColor:
                        sortMode === "title"
                          ? theme.colors.primary
                          : theme.colors.background,
                      borderColor:
                        sortMode === "title"
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setSortMode("title");
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color:
                        sortMode === "title"
                          ? "#FFFFFF"
                          : theme.colors.textPrimary,
                      fontWeight: "700",
                    },
                  },
                  "Title",
                ),
              ),
            ),
            !folder.isSystem
              ? React.createElement(
                  View,
                  { style: styles.quizActionButtonsRowWrap },
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.actionMiniButtonWrap,
                        { backgroundColor: theme.colors.accent },
                      ],
                      onPress: function () {
                        if (props.onRenameFolder) props.onRenameFolder(folder);
                      },
                    },
                    React.createElement(MaterialIcons, {
                      name: "edit",
                      size: 18,
                      color: "#FFFFFF",
                    }),
                    React.createElement(
                      Text,
                      { style: styles.actionMiniButtonText },
                      "Rename Folder",
                    ),
                  ),
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.actionMiniButtonWrap,
                        { backgroundColor: theme.colors.error },
                      ],
                      onPress: function () {
                        if (props.onDeleteFolder) props.onDeleteFolder(folder);
                      },
                    },
                    React.createElement(MaterialIcons, {
                      name: "delete",
                      size: 18,
                      color: "#FFFFFF",
                    }),
                    React.createElement(
                      Text,
                      { style: styles.actionMiniButtonText },
                      "Delete Folder",
                    ),
                  ),
                )
              : null,
          ),
          filteredQuizzes.length === 0
            ? React.createElement(
                View,
                {
                  style: [
                    styles.countdownEmptyCard,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(MaterialIcons, {
                  name: "folder-open",
                  size: 38,
                  color: theme.colors.textSecondary,
                }),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.countdownEmptyText,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "No quizzes found in this folder",
                ),
              )
            : filteredQuizzes.map(function (quiz) {
                return props.renderQuizCard(quiz);
              }),
        ),
      ),
    );
  };

  const QuickCreateMenuModal = function (props) {
    const theme = props.theme;

    if (!props.visible) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.modalOverlay,
            {
              paddingTop: props.insetsTop || 0,
              paddingBottom: (props.insetsBottom || 0) + 80,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            },
          ],
          activeOpacity: 1,
          onPress: props.onClose,
        },
        React.createElement(
          View,
          {
            style: [
              styles.quickCreateMenuCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.quickCreateMenuItem,
                { borderBottomColor: theme.colors.border },
              ],
              onPress: function () {
                props.onCreateFolder();
              },
            },
            React.createElement(MaterialIcons, {
              name: "create-new-folder",
              size: 22,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.quickCreateMenuItemText,
                  { color: theme.colors.textPrimary },
                ],
              },
              "New Folder",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: styles.quickCreateMenuItem,
              onPress: function () {
                props.onCreateQuiz();
              },
            },
            React.createElement(MaterialIcons, {
              name: "quiz",
              size: 22,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.quickCreateMenuItemText,
                  { color: theme.colors.textPrimary },
                ],
              },
              "New Quiz",
            ),
          ),
        ),
      ),
    );
  };

  const BottomTabBar = function (props) {
    const theme = props.theme;
    const tabs = [
      { id: "home", label: "Home", icon: "home" },
      { id: "myQuiz", label: "Quizzes", icon: "article" },
      { id: "aiPlan", label: "AI Plan", icon: "auto-awesome" },
      { id: "progress", label: "Progress", icon: "bar-chart" },
      { id: "wellbeing", label: "Wellbeing", icon: "favorite-border" },
      { id: "explore", label: "Explore", icon: "explore" },
    ];

    return React.createElement(
      View,
      {
        style: [
          styles.appleTabBar,
          {
            backgroundColor: "rgba(255,255,255,0.96)",
            borderTopColor: theme.colors.border,
            paddingBottom: 8 + (props.insetsBottom || 0),
          },
        ],
      },
      tabs.map(function (tab) {
        const active = props.active === tab.id;
        return React.createElement(
          TouchableOpacity,
          {
            key: tab.id,
            style: styles.appleTabItem,
            activeOpacity: 0.78,
            onPress: function () {
              if (props.onSelect) props.onSelect(tab.id);
            },
          },
          React.createElement(MaterialIcons, {
            name: tab.icon,
            size: 27,
            color: active ? theme.colors.accent : theme.colors.textSecondary,
          }),
          React.createElement(
            Text,
            {
              style: [
                styles.appleTabLabel,
                {
                  color: active
                    ? theme.colors.accent
                    : theme.colors.textSecondary,
                },
              ],
            },
            tab.label,
          ),
        );
      }),
    );
  };

  const toNumberSafe = function (value, fallback) {
    const parsed = typeof value === "number" ? value : parseFloat(value);
    if (isNaN(parsed)) return typeof fallback === "number" ? fallback : 0;
    return parsed;
  };

  const formatPercentText = function (value) {
    if (typeof value !== "number" || isNaN(value)) return "—";
    return String(Math.round(value)) + "%";
  };

  const formatShortDate = function (dateValue) {
    const label = formatDateOnly(dateValue);
    return label || "—";
  };

  const isDateInCurrentMonth = function (dateValue) {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  };

  const getAttemptDayKey = function (dateValue) {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  };

  const getFallbackQuestionCountForAttempt = function (attempt, quizMap) {
    if (attempt && attempt.totalQuestions)
      return toNumberSafe(attempt.totalQuestions, 0);
    const quiz = quizMap && attempt ? quizMap[attempt.quizId] : null;
    if (quiz && quiz.questionCount) return toNumberSafe(quiz.questionCount, 0);
    return 0;
  };

  const getFoldersAsSubjects = function (foldersData, quizzes) {
    return buildFolderListFromData(foldersData || [], quizzes || []).filter(
      function (folder) {
        return folder && !folder.isSystem && folder.id !== UNFILED_FOLDER_ID;
      },
    );
  };

  const getQuizzesByFolderId = function (quizzes, folderId) {
    return (quizzes || []).filter(function (quiz) {
      return getFolderIdForQuiz(quiz) === folderId;
    });
  };

  const getAttemptLogsByQuizIds = function (attemptLogs, quizIds) {
    const quizIdMap = {};
    (quizIds || []).forEach(function (id) {
      quizIdMap[String(id)] = true;
    });
    return (attemptLogs || []).filter(function (attempt) {
      return attempt && quizIdMap[String(attempt.quizId || "")];
    });
  };

  const calculateAverageScore = function (attempts) {
    if (!attempts || attempts.length === 0) return null;
    const total = attempts.reduce(function (sum, attempt) {
      return sum + toNumberSafe(attempt.score, 0);
    }, 0);
    return total / attempts.length;
  };

  const calculateAverageCorrectMarks = function (attempts) {
    if (!attempts || attempts.length === 0) return null;
    const total = attempts.reduce(function (sum, attempt) {
      return sum + toNumberSafe(attempt.correctAnswers, 0);
    }, 0);
    return total / attempts.length;
  };

  const calculateMonthlyQuestions = function (attempts, quizMap) {
    return (attempts || []).reduce(function (sum, attempt) {
      if (!isDateInCurrentMonth(attempt.completedAt)) return sum;
      return sum + getFallbackQuestionCountForAttempt(attempt, quizMap || {});
    }, 0);
  };

  const calculateMonthlyAttemptCount = function (attempts) {
    return (attempts || []).filter(function (attempt) {
      return isDateInCurrentMonth(attempt.completedAt);
    }).length;
  };

  const calculateStudyStreak = function (attempts) {
    const dayMap = {};
    (attempts || []).forEach(function (attempt) {
      const key = getAttemptDayKey(attempt.completedAt);
      if (key) dayMap[key] = true;
    });

    const today = startOfLocalDay(new Date());
    let currentStreak = 0;
    let cursor = new Date(today.getTime());

    while (true) {
      const key = getAttemptDayKey(cursor);
      if (!dayMap[key]) break;
      currentStreak++;
      cursor = new Date(cursor.getTime() - 86400000);
    }

    const sortedKeys = Object.keys(dayMap).sort();
    let bestStreak = 0;
    let runningStreak = 0;
    let previousTime = null;

    sortedKeys.forEach(function (key) {
      const parts = key.split("-");
      const currentTime = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10),
      ).getTime();

      if (previousTime !== null && currentTime - previousTime === 86400000) {
        runningStreak++;
      } else {
        runningStreak = 1;
      }

      bestStreak = Math.max(bestStreak, runningStreak);
      previousTime = currentTime;
    });

    const latestAttempt =
      (attempts || []).slice().sort(function (a, b) {
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      })[0] || null;

    return {
      currentStreak: currentStreak,
      bestStreak: bestStreak,
      latestDate: latestAttempt ? latestAttempt.completedAt : null,
    };
  };

  const calculateConsistencyScore = function (streakDays) {
    const days = toNumberSafe(streakDays, 0);
    if (days <= 0) return 40;
    if (days === 1) return 60;
    if (days === 2) return 70;
    if (days === 3) return 80;
    if (days >= 4 && days <= 6) return 90;
    return 100;
  };

  const calculatePracticeVolumeScore = function (monthlyQuestions) {
    const total = toNumberSafe(monthlyQuestions, 0);
    if (total <= 0) return 40;
    if (total >= 1 && total <= 19) return 60;
    if (total >= 20 && total <= 49) return 75;
    if (total >= 50 && total <= 99) return 85;
    if (total >= 100 && total <= 149) return 95;
    return 100;
  };

  const calculateExamReadiness = function (
    averageScore,
    streakDays,
    monthlyQuestions,
  ) {
    if (typeof averageScore !== "number" || isNaN(averageScore)) return null;
    const consistencyScore = calculateConsistencyScore(streakDays);
    const practiceVolumeScore = calculatePracticeVolumeScore(monthlyQuestions);
    return Math.round(
      averageScore * 0.7 + consistencyScore * 0.15 + practiceVolumeScore * 0.15,
    );
  };

  const getReadinessZone = function (readiness, theme) {
    if (typeof readiness !== "number" || isNaN(readiness)) {
      return {
        label: "Not enough data",
        color: theme.colors.textSecondary,
        message:
          "Complete a quiz attempt in this subject to unlock exam readiness.",
      };
    }

    if (readiness >= 75) {
      return {
        label: "Strong readiness",
        color: theme.colors.success,
        message:
          "You are in a strong position. Maintain light but consistent revision.",
      };
    }

    if (readiness >= 60) {
      return {
        label: "Moderate readiness",
        color: theme.colors.warning,
        message:
          "You are progressing well. A little more focused practice can improve readiness.",
      };
    }

    return {
      label: "Needs attention",
      color: theme.colors.error,
      message:
        "This subject needs more practice. Start with weak and skipped questions.",
    };
  };

  const calculateWeakestQuiz = function (subjectQuizzes, subjectAttempts) {
    if (
      !subjectQuizzes ||
      subjectQuizzes.length === 0 ||
      !subjectAttempts ||
      subjectAttempts.length === 0
    ) {
      return null;
    }

    const attemptMap = {};
    (subjectAttempts || []).forEach(function (attempt) {
      const quizId = String(attempt.quizId || "");
      if (!attemptMap[quizId]) attemptMap[quizId] = [];
      attemptMap[quizId].push(attempt);
    });

    let weakest = null;

    (subjectQuizzes || []).forEach(function (quiz) {
      const attempts = attemptMap[String(quiz.id)] || [];
      if (attempts.length === 0) return;
      const averageScore = calculateAverageScore(attempts);
      const wrongSkipped = attempts.reduce(function (sum, attempt) {
        return (
          sum +
          toNumberSafe(attempt.incorrectAnswers, 0) +
          toNumberSafe(attempt.skippedAnswers, 0)
        );
      }, 0);

      const candidate = {
        quiz: quiz,
        averageScore: averageScore,
        wrongSkipped: wrongSkipped,
        attempts: attempts.length,
      };

      if (!weakest || candidate.averageScore < weakest.averageScore) {
        weakest = candidate;
      }
    });

    return weakest;
  };

  const calculateImprovementTrend = function (attempts) {
    const chronological = (attempts || []).slice().sort(function (a, b) {
      return (
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
      );
    });

    if (chronological.length < 2) return null;

    const firstAttempts = chronological.slice(
      0,
      Math.min(3, chronological.length),
    );
    const latestAttempts = chronological.slice(
      Math.max(0, chronological.length - 3),
    );
    const firstAverage = calculateAverageScore(firstAttempts);
    const latestAverage = calculateAverageScore(latestAttempts);

    return {
      firstAverage: firstAverage,
      latestAverage: latestAverage,
      difference:
        typeof firstAverage === "number" && typeof latestAverage === "number"
          ? Math.round(latestAverage - firstAverage)
          : 0,
    };
  };

  const buildProgressDataForSubject = function (folder, quizzes, attemptLogs) {
    const subjectQuizzes = getQuizzesByFolderId(quizzes || [], folder.id);
    const quizMap = {};
    subjectQuizzes.forEach(function (quiz) {
      quizMap[quiz.id] = quiz;
    });
    const quizIds = subjectQuizzes.map(function (quiz) {
      return quiz.id;
    });
    const subjectAttempts = getAttemptLogsByQuizIds(attemptLogs || [], quizIds);
    const averageScore = calculateAverageScore(subjectAttempts);
    const averageCorrectMarks = calculateAverageCorrectMarks(subjectAttempts);
    const monthlyQuestions = calculateMonthlyQuestions(
      subjectAttempts,
      quizMap,
    );
    const monthlyAttempts = calculateMonthlyAttemptCount(subjectAttempts);
    const streak = calculateStudyStreak(subjectAttempts);
    const readiness = calculateExamReadiness(
      averageScore,
      streak.currentStreak,
      monthlyQuestions,
    );
    const weakestQuiz = calculateWeakestQuiz(subjectQuizzes, subjectAttempts);
    const improvementTrend = calculateImprovementTrend(subjectAttempts);
    const latestAttempt =
      subjectAttempts.slice().sort(function (a, b) {
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      })[0] || null;

    return {
      folder: folder,
      subjectName: folder.name,
      quizzes: subjectQuizzes,
      attempts: subjectAttempts,
      quizMap: quizMap,
      averageScore: averageScore,
      averageCorrectMarks: averageCorrectMarks,
      monthlyQuestions: monthlyQuestions,
      monthlyAttempts: monthlyAttempts,
      streak: streak,
      readiness: readiness,
      weakestQuiz: weakestQuiz,
      improvementTrend: improvementTrend,
      latestAttempt: latestAttempt,
    };
  };

  const buildOverallProgressData = function (subjectDataList) {
    const allAttempts = [];
    let totalMonthlyQuestions = 0;

    (subjectDataList || []).forEach(function (subject) {
      totalMonthlyQuestions += subject.monthlyQuestions || 0;
      (subject.attempts || []).forEach(function (attempt) {
        allAttempts.push(attempt);
      });
    });

    const averageScore = calculateAverageScore(allAttempts);
    const streak = calculateStudyStreak(allAttempts);
    const readiness = calculateExamReadiness(
      averageScore,
      streak.currentStreak,
      totalMonthlyQuestions,
    );

    return {
      attempts: allAttempts,
      averageScore: averageScore,
      monthlyQuestions: totalMonthlyQuestions,
      streak: streak,
      readiness: readiness,
    };
  };

  const getProgressRecommendation = function (subjectData) {
    if (
      !subjectData ||
      !subjectData.attempts ||
      subjectData.attempts.length === 0
    ) {
      return "Complete one quiz in this subject to start building your progress record.";
    }

    if (
      typeof subjectData.readiness === "number" &&
      subjectData.readiness >= 75
    ) {
      return "Your readiness is strong. Maintain consistency with light revision.";
    }

    if (
      subjectData.improvementTrend &&
      subjectData.improvementTrend.difference > 0
    ) {
      return "Your score is improving. Continue one more quiz this week.";
    }

    if ((subjectData.monthlyQuestions || 0) < 50) {
      return "This subject needs more practice this month.";
    }

    return "Practise weak and skipped questions from this subject.";
  };

  const ProgressMetricRow = function (props) {
    return React.createElement(
      View,
      { style: styles.progressMetricRow },
      React.createElement(
        Text,
        {
          style: [
            styles.progressMetricLabel,
            { color: props.theme.colors.textSecondary },
          ],
        },
        props.label,
      ),
      React.createElement(
        Text,
        {
          style: [
            styles.progressMetricValue,
            { color: props.color || props.theme.colors.textPrimary },
          ],
        },
        props.value,
      ),
    );
  };

  const ProgressInfoCard = function (props) {
    const theme = props.theme;
    return React.createElement(
      View,
      {
        style: [
          styles.progressInfoCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ],
      },
      React.createElement(
        View,
        { style: styles.progressInfoCardHeader },
        React.createElement(
          View,
          {
            style: [
              styles.progressIconWrap,
              {
                backgroundColor: props.iconBackground || theme.colors.lavender,
              },
            ],
          },
          React.createElement(MaterialIcons, {
            name: props.icon || "insights",
            size: 22,
            color: props.iconColor || theme.colors.accent,
          }),
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.progressInfoCardTitle,
              { color: theme.colors.textPrimary },
            ],
          },
          props.title,
        ),
      ),
      props.children,
    );
  };

  const AI_PLANNER_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getTodayDayName = function () {
    return AI_PLANNER_DAYS[(new Date().getDay() + 6) % 7];
  };

  const getDayIndex = function (dayName) {
    const found = AI_PLANNER_DAYS.indexOf(dayName);
    return found >= 0 ? found : 0;
  };

  const formatReadableDate = function (dateValue) {
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "No exam date yet";
      return d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "No exam date yet";
    }
  };

  const getDaysAgoText = function (dateValue) {
    if (!dateValue) return "Not studied yet";
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "Not studied yet";
      const today = startOfLocalDay(new Date()).getTime();
      const then = startOfLocalDay(d).getTime();
      const diff = Math.max(0, Math.floor((today - then) / 86400000));
      if (diff === 0) return "Today";
      if (diff === 1) return "1 day ago";
      return diff + " days ago";
    } catch (e) {
      return "Not studied yet";
    }
  };

  const getPlannerZoneLabel = function (readiness) {
    if (typeof readiness !== "number" || isNaN(readiness)) return "Weak Zone";
    if (readiness >= 75) return "Green Zone / Strong Zone";
    if (readiness >= 60) return "Orange Zone / Mild Zone";
    return "Red Zone / Weak Zone";
  };

  const getPlannerZoneColor = function (readiness, theme) {
    if (typeof readiness !== "number" || isNaN(readiness))
      return theme.colors.error;
    if (readiness >= 75) return theme.colors.success;
    if (readiness >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  const parsePlannerTimeToMinutes = function (timeLabel) {
    const raw = timeLabel ? String(timeLabel).trim().toUpperCase() : "";
    const match = raw.match(/^(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)$/);
    if (!match) return null;
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const meridiem = match[3];
    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 1 ||
      hour > 12 ||
      minute < 0 ||
      minute > 59
    )
      return null;
    if (meridiem === "AM" && hour === 12) hour = 0;
    if (meridiem === "PM" && hour !== 12) hour += 12;
    return hour * 60 + minute;
  };

  const formatPlannerMinutes = function (totalMinutes) {
    const safeTotal = ((totalMinutes % 1440) + 1440) % 1440;
    let hour24 = Math.floor(safeTotal / 60);
    const minute = safeTotal % 60;
    const meridiem = hour24 >= 12 ? "PM" : "AM";
    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;
    return (
      String(hour12) + ":" + String(minute).padStart(2, "0") + " " + meridiem
    );
  };

  const rangesOverlap = function (startA, endA, startB, endB) {
    return startA < endB && startB < endA;
  };

  const validatePlannerSlots = function (slots, existingSlots, label) {
    const list = slots || [];
    for (let i = 0; i < list.length; i++) {
      const slot = list[i];
      const start = parsePlannerTimeToMinutes(slot.startTime);
      const end = parsePlannerTimeToMinutes(slot.endTime);
      if (start === null || end === null)
        return "Please select AM or PM for both start and end time.";
      if (start >= end) return "Start time must be before end time.";
      const sameDaySlots = list.filter(function (other, otherIndex) {
        return otherIndex !== i && other.day === slot.day;
      });
      for (let j = 0; j < sameDaySlots.length; j++) {
        const otherStart = parsePlannerTimeToMinutes(sameDaySlots[j].startTime);
        const otherEnd = parsePlannerTimeToMinutes(sameDaySlots[j].endTime);
        if (
          otherStart !== null &&
          otherEnd !== null &&
          rangesOverlap(start, end, otherStart, otherEnd)
        ) {
          return (
            label +
            " time overlaps with another slot. Please choose a different time."
          );
        }
      }
      const external = (existingSlots || []).filter(function (other) {
        return other.day === slot.day;
      });
      for (let k = 0; k < external.length; k++) {
        const extStart = parsePlannerTimeToMinutes(external[k].startTime);
        const extEnd = parsePlannerTimeToMinutes(external[k].endTime);
        if (
          extStart !== null &&
          extEnd !== null &&
          rangesOverlap(start, end, extStart, extEnd)
        ) {
          return label + " time cannot overlap with study time.";
        }
      }
    }
    return "";
  };

  const getLatestPlannerRecord = function (data) {
    const list = Array.isArray(data) ? data : [];
    if (list.length === 0) return null;
    return (
      list.slice().sort(function (a, b) {
        return (
          new Date(
            b.scheduleGeneratedAt || b.updatedAt || b.createdAt || 0,
          ).getTime() -
          new Date(
            a.scheduleGeneratedAt || a.updatedAt || a.createdAt || 0,
          ).getTime()
        );
      })[0] || null
    );
  };

  const normalizeStoredSchedule = function (record) {
    if (!record) return [];
    if (Array.isArray(record.generatedWeeklySchedule))
      return record.generatedWeeklySchedule;
    if (typeof record.generatedWeeklySchedule === "string") {
      try {
        const parsed = JSON.parse(record.generatedWeeklySchedule);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const buildPlannerPriorityList = function (
    subjectDataList,
    selectedSubjectIds,
    subjectExamDates,
  ) {
    const now = startOfLocalDay(new Date()).getTime();
    const selectedMap = {};
    (selectedSubjectIds || []).forEach(function (id) {
      selectedMap[String(id)] = true;
    });
    const selectedSubjects = (subjectDataList || []).filter(function (subject) {
      return selectedMap[String(subject.folder.id)];
    });
    const hasExamDates = Object.keys(subjectExamDates || {}).some(
      function (id) {
        return !!subjectExamDates[id];
      },
    );

    return selectedSubjects
      .map(function (subject, index) {
        const readiness =
          typeof subject.readiness === "number" ? subject.readiness : 35;
        const weaknessScore = 100 - readiness;
        const latest = subject.latestAttempt
          ? new Date(subject.latestAttempt.completedAt).getTime()
          : 0;
        const daysSince = latest
          ? Math.max(0, Math.floor((Date.now() - latest) / 86400000))
          : 14;
        const examDate =
          subjectExamDates && subjectExamDates[subject.folder.id]
            ? new Date(subjectExamDates[subject.folder.id])
            : null;
        let examNearness = 0;
        if (examDate && !isNaN(examDate.getTime())) {
          const daysToExam = Math.max(
            0,
            Math.ceil((startOfLocalDay(examDate).getTime() - now) / 86400000),
          );
          examNearness = Math.max(0, 100 - Math.min(100, daysToExam * 4));
        }
        const balanceScore = 70 + (index % 3) * 5;
        const priority = hasExamDates
          ? examNearness * 0.5 +
            weaknessScore * 0.35 +
            Math.min(100, daysSince * 8) * 0.15
          : weaknessScore * 0.6 +
            Math.min(100, daysSince * 8) * 0.25 +
            balanceScore * 0.15;
        return {
          id: subject.folder.id,
          subjectName: subject.subjectName,
          readiness: subject.readiness,
          latestAttempt: subject.latestAttempt,
          weakestQuiz: subject.weakestQuiz,
          priority: priority,
          hasExamDate: !!(
            subjectExamDates && subjectExamDates[subject.folder.id]
          ),
          sourcePriority: hasExamDates
            ? subjectExamDates[subject.folder.id]
              ? "Closest exam + readiness"
              : "Weakness backup"
            : "Weakest subject",
        };
      })
      .sort(function (a, b) {
        return b.priority - a.priority;
      });
  };

  const choosePlannerTaskTitle = function (duration, subject, sessionIndex) {
    const weakTopic =
      subject && subject.weakestQuiz && subject.weakestQuiz.quiz
        ? subject.weakestQuiz.quiz.title
        : "";
    if (duration <= 30) return weakTopic ? "Formula Review" : "Light Revision";
    if (duration <= 60)
      return sessionIndex % 2 === 0
        ? "Wrong Question Review"
        : "Objective Practice";
    if (duration <= 90) return "Weak Topic Repair";
    if (duration <= 150) return "Full Objective Paper Practice";
    return "Objective Practice";
  };

  const buildPlannerScheduleFromSettings = function (
    subjectDataList,
    selectedSubjectIds,
    subjectExamDates,
    studyAvailability,
    exerciseFrequency,
    exerciseMode,
    manualExerciseSlots,
  ) {
    const priorityList = buildPlannerPriorityList(
      subjectDataList,
      selectedSubjectIds,
      subjectExamDates,
    );
    const schedule = [];
    let counter = 1;
    let subjectCursor = 0;

    const addItem = function (
      day,
      startMinutes,
      endMinutes,
      type,
      subject,
      taskTitle,
      reason,
      sourcePriority,
    ) {
      schedule.push({
        id:
          "schedule_" +
          String(counter++).padStart(3, "0") +
          "_" +
          day.toLowerCase(),
        day: day,
        date: "",
        startTime: formatPlannerMinutes(startMinutes),
        endTime: formatPlannerMinutes(endMinutes),
        startTimestamp: "",
        endTimestamp: "",
        type: type,
        subject: subject ? subject.subjectName : "",
        taskTitle: taskTitle,
        reason: reason,
        status: "Upcoming",
        sourcePriority: sourcePriority || "",
        relatedWeakTopic:
          subject && subject.weakestQuiz && subject.weakestQuiz.quiz
            ? subject.weakestQuiz.quiz.title
            : "",
      });
    };

    const studySlots = [];
    AI_PLANNER_DAYS.forEach(function (day) {
      ((studyAvailability || {})[day] || []).forEach(function (slot) {
        const start = parsePlannerTimeToMinutes(slot.startTime);
        const end = parsePlannerTimeToMinutes(slot.endTime);
        if (start !== null && end !== null && start < end) {
          studySlots.push({ day: day, start: start, end: end });
        }
      });
    });

    const exerciseSlotsToUse = [];
    if (exerciseFrequency > 0 && exerciseMode === "manual") {
      (manualExerciseSlots || [])
        .slice(0, exerciseFrequency)
        .forEach(function (slot) {
          const start = parsePlannerTimeToMinutes(slot.startTime);
          const end = parsePlannerTimeToMinutes(slot.endTime);
          if (start !== null && end !== null && start < end) {
            exerciseSlotsToUse.push({ day: slot.day, start: start, end: end });
          }
        });
    }

    if (exerciseFrequency > 0 && exerciseMode === "ai") {
      const candidateDays = AI_PLANNER_DAYS.filter(function (day) {
        return ((studyAvailability || {})[day] || []).length > 0;
      });
      const sourceDays =
        candidateDays.length > 0 ? candidateDays : AI_PLANNER_DAYS;
      for (let i = 0; i < exerciseFrequency; i++) {
        const day =
          sourceDays[
            Math.floor((i * sourceDays.length) / exerciseFrequency) %
              sourceDays.length
          ];
        const daySlots = (studyAvailability || {})[day] || [];
        let start = 18 * 60;
        if (daySlots.length > 0) {
          const latestStudyEnd = daySlots.reduce(function (max, slot) {
            const end = parsePlannerTimeToMinutes(slot.endTime);
            return end !== null ? Math.max(max, end) : max;
          }, 0);
          start = Math.min(21 * 60, Math.max(6 * 60, latestStudyEnd + 30));
        }
        exerciseSlotsToUse.push({ day: day, start: start, end: start + 45 });
      }
    }

    exerciseSlotsToUse.forEach(function (slot) {
      addItem(
        slot.day,
        slot.start,
        slot.end,
        "exercise",
        null,
        "Exercise",
        "Placed to balance study, rest and recovery.",
        "Exercise preference",
      );
    });

    studySlots
      .sort(function (a, b) {
        const dayDiff = getDayIndex(a.day) - getDayIndex(b.day);
        return dayDiff !== 0 ? dayDiff : a.start - b.start;
      })
      .forEach(function (slot) {
        const duration = slot.end - slot.start;
        const subject =
          priorityList[subjectCursor % Math.max(1, priorityList.length)];
        subjectCursor++;
        if (!subject) return;

        const baseReason = subject.hasExamDate
          ? subject.subjectName +
            " is prioritised because its exam date and readiness need attention."
          : subject.subjectName +
            " is prioritised based on exam readiness and recent study history.";

        if (duration >= 150) {
          const firstEnd = slot.start + 75;
          const breakEnd = firstEnd + 15;
          addItem(
            slot.day,
            slot.start,
            firstEnd,
            "study",
            subject,
            "Weak Topic Repair",
            baseReason,
            subject.sourcePriority,
          );
          addItem(
            slot.day,
            firstEnd,
            breakEnd,
            "break",
            null,
            "Break",
            "A short break keeps long sessions realistic.",
            "Long slot split",
          );
          addItem(
            slot.day,
            breakEnd,
            slot.end,
            "study",
            subject,
            "Objective Practice",
            "This continues today’s " +
              subject.subjectName +
              " improvement block.",
            subject.sourcePriority,
          );
          return;
        }

        const taskTitle = choosePlannerTaskTitle(
          duration,
          subject,
          subjectCursor,
        );
        addItem(
          slot.day,
          slot.start,
          slot.end,
          "study",
          subject,
          taskTitle,
          baseReason,
          subject.sourcePriority,
        );
      });

    return schedule.sort(function (a, b) {
      const dayDiff = getDayIndex(a.day) - getDayIndex(b.day);
      const aStart = parsePlannerTimeToMinutes(a.startTime) || 0;
      const bStart = parsePlannerTimeToMinutes(b.startTime) || 0;
      return dayDiff !== 0 ? dayDiff : aStart - bStart;
    });
  };

  const getScheduleItemComputedStatus = function (
    item,
    completedSessions,
    nowValue,
  ) {
    const now = nowValue ? new Date(nowValue) : new Date();
    const todayName = getTodayDayName();
    const itemDayIndex = getDayIndex(item.day);
    const todayIndex = getDayIndex(todayName);
    const start = parsePlannerTimeToMinutes(item.startTime);
    const end = parsePlannerTimeToMinutes(item.endTime);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (completedSessions && completedSessions[item.id]) return "Done";
    if (
      item.day === todayName &&
      start !== null &&
      end !== null &&
      currentMinutes >= start &&
      currentMinutes < end
    )
      return "Now";
    if (
      itemDayIndex < todayIndex ||
      (item.day === todayName && end !== null && currentMinutes >= end)
    )
      return "Missed";
    return "Upcoming";
  };

  const getScheduleNowAndNext = function (
    schedule,
    completedSessions,
    nowValue,
  ) {
    const now = nowValue ? new Date(nowValue) : new Date();
    const todayName = getTodayDayName();
    const todayIndex = getDayIndex(todayName);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const list = schedule || [];
    let nowItem = null;

    list.forEach(function (item) {
      const status = getScheduleItemComputedStatus(
        item,
        completedSessions,
        now,
      );
      if (status === "Now")
        nowItem = Object.assign({}, item, { computedStatus: status });
    });

    const upcoming = list
      .map(function (item) {
        const start = parsePlannerTimeToMinutes(item.startTime);
        const dayOffset = (getDayIndex(item.day) - todayIndex + 7) % 7;
        const absolute = dayOffset * 1440 + (start || 0);
        const currentAbsolute = currentMinutes;
        return Object.assign({}, item, {
          computedStatus: getScheduleItemComputedStatus(
            item,
            completedSessions,
            now,
          ),
          absoluteSort:
            absolute < currentAbsolute && dayOffset === 0
              ? absolute + 7 * 1440
              : absolute,
        });
      })
      .filter(function (item) {
        return item.computedStatus === "Upcoming";
      })
      .sort(function (a, b) {
        return a.absoluteSort - b.absoluteSort;
      });

    return {
      current: nowItem,
      next: upcoming[0] || null,
      upcoming: upcoming,
    };
  };

  const PlannerTimePickerModal = function (props) {
    const theme = props.theme;
    const initialMinutes = parsePlannerTimeToMinutes(
      props.initialTime || "3:30 PM",
    );
    const initialHour24 =
      initialMinutes === null ? 15 : Math.floor(initialMinutes / 60);
    const initialMinute = initialMinutes === null ? 30 : initialMinutes % 60;
    const [hour, setHour] = useState(
      initialHour24 % 12 === 0 ? 12 : initialHour24 % 12,
    );
    const [minute, setMinute] = useState(initialMinute);
    const [meridiem, setMeridiem] = useState(initialHour24 >= 12 ? "PM" : "AM");

    useEffect(
      function () {
        const nextMinutes = parsePlannerTimeToMinutes(
          props.initialTime || "3:30 PM",
        );
        const nextHour24 =
          nextMinutes === null ? 15 : Math.floor(nextMinutes / 60);
        const nextMinute = nextMinutes === null ? 30 : nextMinutes % 60;
        setHour(nextHour24 % 12 === 0 ? 12 : nextHour24 % 12);
        setMinute(nextMinute);
        setMeridiem(nextHour24 >= 12 ? "PM" : "AM");
      },
      [props.visible, props.initialTime],
    );

    if (!props.visible) return null;

    const minuteOptions = [];
    for (let m = 0; m < 60; m += 5) minuteOptions.push(m);
    const hourOptions = [];
    for (let h = 1; h <= 12; h++) hourOptions.push(h);

    const chip = function (label, selected, onPress) {
      return React.createElement(
        TouchableOpacity,
        {
          key: String(label),
          style: [
            styles.plannerWheelChip,
            {
              backgroundColor: selected
                ? theme.colors.primary
                : theme.colors.background,
              borderColor: selected
                ? theme.colors.primary
                : theme.colors.border,
            },
          ],
          onPress: onPress,
        },
        React.createElement(
          Text,
          {
            style: [
              styles.plannerWheelChipText,
              { color: selected ? "#FFFFFF" : theme.colors.textPrimary },
            ],
          },
          String(label).padStart(
            label < 10 && typeof label === "number" ? 2 : 0,
            "0",
          ),
        ),
      );
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "fade",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        {
          style: [
            styles.modalOverlay,
            {
              paddingTop: props.insetsTop || 0,
              paddingBottom: props.insetsBottom || 0,
            },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.answerModalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.modalTopRow },
            React.createElement(
              Text,
              { style: [styles.modalTitle, { color: theme.colors.primary }] },
              props.title || "Select Time",
            ),
            React.createElement(DismissButton, {
              onPress: props.onClose,
              color: theme.colors.textPrimary,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.modalDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "Choose the hour, minute and AM / PM just like an alarm picker.",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.plannerPickerPreview,
                { color: theme.colors.primary },
              ],
            },
            String(hour) +
              ":" +
              String(minute).padStart(2, "0") +
              " " +
              meridiem,
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownPickerSectionTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Hour",
          ),
          React.createElement(
            ScrollView,
            {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: { marginBottom: 12 },
            },
            hourOptions.map(function (h) {
              return chip(h, hour === h, function () {
                setHour(h);
              });
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.countdownPickerSectionTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Minute",
          ),
          React.createElement(
            ScrollView,
            {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: { marginBottom: 12 },
            },
            minuteOptions.map(function (m) {
              return chip(m, minute === m, function () {
                setMinute(m);
              });
            }),
          ),
          React.createElement(
            View,
            { style: styles.plannerMeridiemRow },
            ["AM", "PM"].map(function (value) {
              const selected = meridiem === value;
              return React.createElement(
                TouchableOpacity,
                {
                  key: value,
                  style: [
                    styles.plannerMeridiemButton,
                    {
                      backgroundColor: selected
                        ? theme.colors.accent
                        : theme.colors.background,
                      borderColor: selected
                        ? theme.colors.accent
                        : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setMeridiem(value);
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerMeridiemText,
                      {
                        color: selected ? "#FFFFFF" : theme.colors.textPrimary,
                      },
                    ],
                  },
                  value,
                ),
              );
            }),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.modalPrimaryButton,
                {
                  backgroundColor: theme.colors.primary,
                  marginTop: 14,
                  marginBottom: 0,
                },
              ],
              onPress: function () {
                props.onSave(
                  String(hour) +
                    ":" +
                    String(minute).padStart(2, "0") +
                    " " +
                    meridiem,
                );
              },
            },
            React.createElement(MaterialIcons, {
              name: "check-circle",
              size: 22,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.modalPrimaryButtonText },
              "Save",
            ),
          ),
        ),
      ),
    );
  };

  const PlannerScheduleItemCard = function (props) {
    const theme = props.theme;
    const item = props.item;
    const status =
      props.status || item.computedStatus || item.status || "Upcoming";
    let bg = theme.colors.card;
    let border = theme.colors.border;
    let badgeBg = theme.colors.background;
    let badgeColor = theme.colors.textPrimary;
    let textColor = theme.colors.textPrimary;

    if (status === "Now") {
      bg = theme.colors.lavender;
      border = theme.colors.accent;
      badgeBg = theme.colors.accent;
      badgeColor = "#FFFFFF";
    } else if (status === "Up Next") {
      bg = theme.colors.card;
      border = theme.colors.periwinkle;
      badgeBg = "#E0E7FF";
      badgeColor = theme.colors.primary;
    } else if (status === "Done") {
      bg = "#F8FAFC";
      textColor = theme.colors.disabled;
      badgeBg = "#E2E8F0";
      badgeColor = theme.colors.textSecondary;
    } else if (status === "Missed") {
      bg = "#FEF2F2";
      border = "#FCA5A5";
      badgeBg = "#FEE2E2";
      badgeColor = theme.colors.error;
    }

    return React.createElement(
      View,
      {
        style: [
          styles.plannerScheduleCard,
          { backgroundColor: bg, borderColor: border },
        ],
      },
      React.createElement(
        View,
        { style: styles.plannerScheduleTopRow },
        React.createElement(
          Text,
          { style: [styles.plannerScheduleTime, { color: textColor }] },
          item.startTime + " - " + item.endTime,
        ),
        React.createElement(
          View,
          { style: [styles.plannerStatusBadge, { backgroundColor: badgeBg }] },
          React.createElement(
            Text,
            { style: [styles.plannerStatusBadgeText, { color: badgeColor }] },
            status,
          ),
        ),
      ),
      React.createElement(
        Text,
        { style: [styles.plannerScheduleSubject, { color: textColor }] },
        item.subject || item.taskTitle,
      ),
      React.createElement(
        Text,
        {
          style: [
            styles.plannerScheduleTask,
            {
              color:
                status === "Done"
                  ? theme.colors.disabled
                  : theme.colors.textSecondary,
            },
          ],
        },
        item.taskTitle,
      ),
      item.reason
        ? React.createElement(
            Text,
            {
              style: [
                styles.plannerScheduleReason,
                {
                  color:
                    status === "Done"
                      ? theme.colors.disabled
                      : theme.colors.textSecondary,
                },
              ],
            },
            "Reason: " + item.reason,
          )
        : null,
      props.onToggleDone
        ? React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.plannerDoneButton,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.card,
                },
              ],
              onPress: function () {
                props.onToggleDone(item);
              },
            },
            React.createElement(MaterialIcons, {
              name: status === "Done" ? "undo" : "check",
              size: 18,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerDoneButtonText,
                  { color: theme.colors.primary },
                ],
              },
              status === "Done" ? "Undo Done" : "Mark Done",
            ),
          )
        : null,
    );
  };

  const PlannerFullScheduleModal = function (props) {
    const theme = props.theme;
    const [expandedDay, setExpandedDay] = useState(getTodayDayName());
    if (!props.visible) return null;

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: false,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: props.insetsTop || 0,
          title: "Full Weekly Schedule",
          showBack: true,
          onBack: props.onClose,
          showNext: false,
        }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            contentContainerStyle: {
              padding: 16,
              paddingBottom: 80 + (props.insetsBottom || 0),
            },
          },
          AI_PLANNER_DAYS.map(function (day) {
            const items = (props.schedule || []).filter(function (item) {
              return item.day === day;
            });
            const expanded = expandedDay === day;
            return React.createElement(
              View,
              {
                key: day,
                style: [
                  styles.plannerDayGroup,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                TouchableOpacity,
                {
                  style: styles.plannerDayHeader,
                  onPress: function () {
                    setExpandedDay(expanded ? "" : day);
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerDayTitle,
                      { color: theme.colors.primary },
                    ],
                  },
                  day,
                ),
                React.createElement(MaterialIcons, {
                  name: expanded ? "expand-less" : "expand-more",
                  size: 24,
                  color: theme.colors.textSecondary,
                }),
              ),
              expanded
                ? items.length === 0
                  ? React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerEmptyText,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      "No session added.",
                    )
                  : items.map(function (item) {
                      const computed = getScheduleItemComputedStatus(
                        item,
                        props.completedSessions || {},
                        new Date(),
                      );
                      return React.createElement(PlannerScheduleItemCard, {
                        key: item.id,
                        theme: theme,
                        item: item,
                        status: computed,
                        onToggleDone: props.onToggleDone,
                      });
                    })
                : null,
            );
          }),
        ),
      ),
    );
  };

  const AIPlanScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");
    const { data: quizzesData, refetch: refetchQuizzes } = useQuery("quizzes");
    const { data: attemptLogsData, refetch: refetchAttempts } =
      useQuery("attemptLogs");
    const { data: existingPlannerData, refetch: refetchPlanner } =
      useQuery("aiPlannerSchedule");
    const { mutate: insertPlanner } = useMutation(
      "aiPlannerSchedule",
      "insert",
    );
    const { mutate: updatePlanner } = useMutation(
      "aiPlannerSchedule",
      "update",
    );

    const folders = Array.isArray(foldersData) ? foldersData : [];
    const quizzes = Array.isArray(quizzesData) ? quizzesData : [];
    const attemptLogs = Array.isArray(attemptLogsData) ? attemptLogsData : [];
    const subjects = getFoldersAsSubjects(folders, quizzes);
    const subjectDataList = subjects.map(function (folder) {
      return buildProgressDataForSubject(folder, quizzes, attemptLogs);
    });

    const [step, setStep] = useState(1);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [subjectExamDates, setSubjectExamDates] = useState({});
    const [studyAvailability, setStudyAvailability] = useState({});
    const [exerciseFrequency, setExerciseFrequency] = useState(0);
    const [exerciseMode, setExerciseMode] = useState("ai");
    const [manualExerciseSlots, setManualExerciseSlots] = useState([]);
    const [datePickerSubject, setDatePickerSubject] = useState(null);
    const [timePickerTarget, setTimePickerTarget] = useState(null);
    const [savingPlan, setSavingPlan] = useState(false);
    const [plannerStarted, setPlannerStarted] = useState(false);

    const existingPlannerRecord = getLatestPlannerRecord(existingPlannerData);
    const existingGeneratedSchedule = normalizeStoredSchedule(
      existingPlannerRecord,
    );
    const hasExistingGeneratedSchedule = existingGeneratedSchedule.length > 0;

    const loadPlannerRecordIntoForm = function (record) {
      if (!record) return;

      if (Array.isArray(record.selectedSubjects)) {
        setSelectedSubjects(record.selectedSubjects);
      }

      if (
        record.subjectExamDates &&
        typeof record.subjectExamDates === "object"
      ) {
        setSubjectExamDates(record.subjectExamDates);
      }

      if (
        record.studyAvailability &&
        typeof record.studyAvailability === "object"
      ) {
        setStudyAvailability(record.studyAvailability);
      }

      if (typeof record.exerciseFrequency === "number") {
        setExerciseFrequency(record.exerciseFrequency);
      }

      if (record.exerciseMode) {
        setExerciseMode(record.exerciseMode);
      }

      if (Array.isArray(record.manualExerciseSlots)) {
        setManualExerciseSlots(record.manualExerciseSlots);
      }
    };

    const startPlannerFlow = function () {
      if (existingPlannerRecord) {
        loadPlannerRecordIntoForm(existingPlannerRecord);
      }
      setStep(1);
      setPlannerStarted(true);
    };

    const exitPlannerFlow = function () {
      setPlannerStarted(false);
      setStep(1);
    };

    useEffect(function () {
      if (refetchFolders) refetchFolders();
      if (refetchQuizzes) refetchQuizzes();
      if (refetchAttempts) refetchAttempts();
      if (refetchPlanner) refetchPlanner();
    }, []);

    useEffect(
      function () {
        if (selectedSubjects.length === 0 && subjectDataList.length > 0) {
          setSelectedSubjects(
            subjectDataList.map(function (item) {
              return item.folder.id;
            }),
          );
        }
      },
      [subjectDataList.length],
    );

    const toggleSubject = function (folderId) {
      setSelectedSubjects(function (prev) {
        const exists = prev.indexOf(folderId) >= 0;
        if (exists)
          return prev.filter(function (id) {
            return id !== folderId;
          });
        return prev.concat([folderId]);
      });
    };

    const addStudySlot = function (day) {
      setStudyAvailability(function (prev) {
        const next = Object.assign({}, prev);
        next[day] = (next[day] || []).concat([
          {
            id: makeId("studySlot", day),
            day: day,
            startTime: "3:30 PM",
            endTime: "6:00 PM",
          },
        ]);
        return next;
      });
    };

    const removeStudySlot = function (day, slotId) {
      setStudyAvailability(function (prev) {
        const next = Object.assign({}, prev);
        next[day] = (next[day] || []).filter(function (slot) {
          return slot.id !== slotId;
        });
        return next;
      });
    };

    const clearDay = function (day) {
      setStudyAvailability(function (prev) {
        const next = Object.assign({}, prev);
        next[day] = [];
        return next;
      });
    };

    const copyDayToOthers = function (day) {
      setStudyAvailability(function (prev) {
        const source = (prev[day] || []).map(function (slot, index) {
          return {
            id: makeId("studySlot", day + "_" + index),
            day: day,
            startTime: slot.startTime,
            endTime: slot.endTime,
          };
        });
        const next = Object.assign({}, prev);
        AI_PLANNER_DAYS.forEach(function (targetDay) {
          next[targetDay] = source.map(function (slot, index) {
            return {
              id: makeId("studySlot", targetDay + "_" + index),
              day: targetDay,
              startTime: slot.startTime,
              endTime: slot.endTime,
            };
          });
        });
        return next;
      });
    };

    const updateStudySlotTime = function (day, slotId, field, value) {
      setStudyAvailability(function (prev) {
        const next = Object.assign({}, prev);
        next[day] = (next[day] || []).map(function (slot) {
          if (slot.id !== slotId) return slot;
          return Object.assign({}, slot, { [field]: value });
        });
        return next;
      });
    };

    const addExerciseSlot = function () {
      const used = manualExerciseSlots.length;
      const day = AI_PLANNER_DAYS[used % AI_PLANNER_DAYS.length];
      setManualExerciseSlots(function (prev) {
        return prev.concat([
          {
            id: makeId("exerciseSlot", day),
            day: day,
            startTime: "6:30 PM",
            endTime: "7:15 PM",
          },
        ]);
      });
    };

    const updateExerciseSlot = function (slotId, field, value) {
      setManualExerciseSlots(function (prev) {
        return prev.map(function (slot) {
          if (slot.id !== slotId) return slot;
          return Object.assign({}, slot, { [field]: value });
        });
      });
    };

    const removeExerciseSlot = function (slotId) {
      setManualExerciseSlots(function (prev) {
        return prev.filter(function (slot) {
          return slot.id !== slotId;
        });
      });
    };

    const allStudySlots = [];
    AI_PLANNER_DAYS.forEach(function (day) {
      ((studyAvailability || {})[day] || []).forEach(function (slot) {
        allStudySlots.push(slot);
      });
    });

    const goNext = function () {
      if (step === 1 && selectedSubjects.length === 0) {
        showMessage(
          "Select Subject",
          "Please select at least one subject to generate your AI study plan.",
        );
        return;
      }
      if (step === 3) {
        if (allStudySlots.length === 0) {
          showMessage(
            "Study Time Needed",
            "Please add at least one study time before generating your AI schedule.",
          );
          return;
        }
        const validation = validatePlannerSlots(allStudySlots, [], "Study");
        if (validation) {
          showMessage("Invalid Study Time", validation);
          return;
        }
      }
      if (step === 4) {
        if (exerciseFrequency > 0 && exerciseMode === "manual") {
          const validation = validatePlannerSlots(
            manualExerciseSlots,
            allStudySlots,
            "Exercise",
          );
          if (validation) {
            showMessage("Invalid Exercise Time", validation);
            return;
          }
          if (manualExerciseSlots.length < exerciseFrequency) {
            showMessage(
              "Exercise Time Needed",
              "You selected " +
                exerciseFrequency +
                " exercise sessions. Please add the remaining exercise time or let AI choose them.",
            );
            return;
          }
        }
      }
      setStep(Math.min(5, step + 1));
    };

    const saveGeneratedSchedule = function () {
      if (selectedSubjects.length === 0) {
        showMessage(
          "Select Subject",
          "Please select at least one subject to generate your AI study plan.",
        );
        return;
      }
      if (allStudySlots.length === 0) {
        showMessage(
          "Study Time Needed",
          "Please add at least one study time before generating your AI schedule.",
        );
        return;
      }

      const generatedWeeklySchedule = buildPlannerScheduleFromSettings(
        subjectDataList,
        selectedSubjects,
        subjectExamDates,
        studyAvailability,
        exerciseFrequency,
        exerciseMode,
        manualExerciseSlots,
      );

      if (generatedWeeklySchedule.length === 0) {
        showMessage(
          "No Schedule Created",
          "AI could not create a schedule from the current settings. Please add study availability.",
        );
        return;
      }

      const record = {
        id: "current_weekly_plan",
        selectedSubjects: selectedSubjects,
        subjectExamDates: subjectExamDates,
        studyAvailability: studyAvailability,
        exerciseFrequency: exerciseFrequency,
        exerciseMode: exerciseMode,
        manualExerciseSlots: manualExerciseSlots,
        generatedWeeklySchedule: generatedWeeklySchedule,
        scheduleGeneratedAt: new Date().toISOString(),
        scheduleStatus: "active",
        completedSessions: {},
        missedSessions: {},
        updatedAt: new Date().toISOString(),
      };

      setSavingPlan(true);
      updatePlanner(record)
        .then(function () {
          setSavingPlan(false);
          if (refetchPlanner) refetchPlanner();
          showMessage(
            hasExistingGeneratedSchedule
              ? "AI Schedule Updated"
              : "AI Schedule Created",
            "Your weekly AI schedule is saved in the Progress tab.",
          );
          if (props.onOpenProgress) props.onOpenProgress();
        })
        .catch(function () {
          insertPlanner(
            Object.assign({}, record, { createdAt: new Date().toISOString() }),
          )
            .then(function () {
              setSavingPlan(false);
              if (refetchPlanner) refetchPlanner();
              showMessage(
                hasExistingGeneratedSchedule
                  ? "AI Schedule Updated"
                  : "AI Schedule Created",
                "Your weekly AI schedule is saved in the Progress tab.",
              );
              if (props.onOpenProgress) props.onOpenProgress();
            })
            .catch(function (error) {
              setSavingPlan(false);
              showMessage(
                "Save Error",
                error && error.message
                  ? error.message
                  : "Unable to save the AI schedule.",
              );
            });
        });
    };

    const renderPlannerStart = function () {
      const mainButtonText = hasExistingGeneratedSchedule
        ? "Press to update your schedule"
        : "Generate Study Schedule";
      const helperText = hasExistingGeneratedSchedule
        ? "You already have a weekly AI schedule. Press the button to update your subjects, exam dates, availability and exercise preference."
        : "Start the standard AI planner flow to build a weekly study schedule from your subjects, exam dates, availability and progress data.";

      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(StatusBar, { barStyle: "dark-content" }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            contentContainerStyle: {
              padding: 20,
              paddingTop: 48 + (insets.top || 0),
              paddingBottom: 150 + (insets.bottom || 0),
            },
          },
          React.createElement(PlannerTodayAIPlanCard, {
            theme: theme,
            schedule: existingGeneratedSchedule,
            completedSessions:
              existingPlannerRecord && existingPlannerRecord.completedSessions
                ? existingPlannerRecord.completedSessions
                : {},
            onCreateAIPlan: startPlannerFlow,
            onToggleDone: null,
            compactTop: true,
            insetsTop: insets.top,
            insetsBottom: insets.bottom,
          }),
          React.createElement(
            View,
            { style: [styles.plannerHeaderBlock, { marginTop: 20 }] },
            React.createElement(
              Text,
              {
                style: [
                  styles.progressLargeTitle,
                  { color: theme.colors.primary },
                ],
              },
              "AI Planner",
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.progressSubtitle,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Create or update your weekly study schedule",
            ),
          ),
          React.createElement(
            View,
            {
              style: [
                styles.plannerSummaryCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              View,
              {
                style: [
                  styles.progressIconWrap,
                  { backgroundColor: theme.colors.lavender, marginBottom: 14 },
                ],
              },
              React.createElement(MaterialIcons, {
                name: "auto-awesome",
                size: 24,
                color: theme.colors.accent,
              }),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerSubjectTitle,
                  { color: theme.colors.textPrimary, marginBottom: 8 },
                ],
              },
              hasExistingGeneratedSchedule
                ? "Your schedule is ready"
                : "Build your AI schedule",
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.progressSubtitle,
                  { color: theme.colors.textSecondary, marginBottom: 16 },
                ],
              },
              helperText,
            ),
            hasExistingGeneratedSchedule && existingPlannerRecord
              ? React.createElement(
                  View,
                  {
                    style: [
                      styles.plannerMiniEmptyBox,
                      {
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                        marginBottom: 16,
                      },
                    ],
                  },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerSubjectMeta,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "Last generated",
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerSubjectTitle,
                        { color: theme.colors.textPrimary },
                      ],
                    },
                    formatDateTime(
                      existingPlannerRecord.scheduleGeneratedAt ||
                        existingPlannerRecord.updatedAt ||
                        existingPlannerRecord.createdAt,
                    ),
                  ),
                )
              : null,
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary },
                ],
                activeOpacity: 0.84,
                onPress: startPlannerFlow,
              },
              React.createElement(MaterialIcons, {
                name: hasExistingGeneratedSchedule
                  ? "update"
                  : "calendar-month",
                size: 20,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.primaryButtonText },
                mainButtonText,
              ),
            ),
          ),
          hasExistingGeneratedSchedule
            ? React.createElement(
                View,
                {
                  style: [
                    styles.plannerSummaryCard,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerSubjectTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Current Weekly Schedule",
                ),
                existingGeneratedSchedule.slice(0, 3).map(function (item) {
                  return React.createElement(PlannerScheduleItemCard, {
                    key: "ai_home_" + item.id,
                    theme: theme,
                    item: item,
                    status: getScheduleItemComputedStatus(
                      item,
                      existingPlannerRecord &&
                        existingPlannerRecord.completedSessions
                        ? existingPlannerRecord.completedSessions
                        : {},
                      new Date(),
                    ),
                  });
                }),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.primaryButton,
                      { backgroundColor: theme.colors.accent, marginTop: 10 },
                    ],
                    activeOpacity: 0.84,
                    onPress: props.onOpenProgress,
                  },
                  React.createElement(MaterialIcons, {
                    name: "bar-chart",
                    size: 20,
                    color: "#FFFFFF",
                  }),
                  React.createElement(
                    Text,
                    { style: styles.primaryButtonText },
                    "View in Progress",
                  ),
                ),
              )
            : null,
        ),
        React.createElement(BottomTabBar, {
          theme: theme,
          active: "aiPlan",
          onSelect: props.onTabSelect,
          insetsBottom: insets.bottom,
        }),
      );
    };

    const renderStepHeader = function (title, subtitle) {
      return React.createElement(
        View,
        { style: styles.plannerHeaderBlock },
        React.createElement(
          Text,
          { style: [styles.plannerStepLabel, { color: theme.colors.accent }] },
          "Step " + step + " of 5",
        ),
        React.createElement(
          Text,
          {
            style: [styles.progressLargeTitle, { color: theme.colors.primary }],
          },
          title,
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.progressSubtitle,
              { color: theme.colors.textSecondary },
            ],
          },
          subtitle,
        ),
      );
    };

    const renderChooseSubjects = function () {
      return React.createElement(
        View,
        null,
        renderStepHeader(
          "Choose Subjects",
          "Select the subjects you want AI to include in your study schedule.",
        ),
        subjectDataList.length === 0
          ? React.createElement(
              View,
              {
                style: [
                  styles.progressEmptyCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(MaterialIcons, {
                name: "folder-open",
                size: 44,
                color: theme.colors.accent,
              }),
              React.createElement(
                Text,
                {
                  style: [
                    styles.progressEmptyTitle,
                    { color: theme.colors.textPrimary },
                  ],
                },
                "Better to study than being too late.",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.progressEmptyText,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Create a subject folder in Quizzes first so AI can build your study plan.",
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.primaryButton,
                    { backgroundColor: theme.colors.primary, marginTop: 16 },
                  ],
                  onPress: props.onOpenQuizzes,
                },
                React.createElement(MaterialIcons, {
                  name: "article",
                  size: 20,
                  color: "#FFFFFF",
                }),
                React.createElement(
                  Text,
                  { style: styles.primaryButtonText },
                  "Go to Quizzes",
                ),
              ),
            )
          : subjectDataList.map(function (subject) {
              const selected = selectedSubjects.indexOf(subject.folder.id) >= 0;
              const zoneColor = getPlannerZoneColor(subject.readiness, theme);
              return React.createElement(
                TouchableOpacity,
                {
                  key: subject.folder.id,
                  style: [
                    styles.plannerSubjectCard,
                    {
                      backgroundColor: selected
                        ? theme.colors.lavender
                        : theme.colors.card,
                      borderColor: selected
                        ? theme.colors.accent
                        : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    toggleSubject(subject.folder.id);
                  },
                },
                React.createElement(MaterialIcons, {
                  name: selected ? "check-box" : "check-box-outline-blank",
                  size: 26,
                  color: selected
                    ? theme.colors.accent
                    : theme.colors.textSecondary,
                }),
                React.createElement(
                  View,
                  { style: { flex: 1, marginLeft: 12 } },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerSubjectTitle,
                        { color: theme.colors.textPrimary },
                      ],
                    },
                    subject.subjectName,
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerSubjectMeta,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "Exam Readiness: " +
                      (subject.readiness === null
                        ? "Not enough data"
                        : String(subject.readiness) + "%"),
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [styles.plannerSubjectZone, { color: zoneColor }],
                    },
                    getPlannerZoneLabel(subject.readiness),
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerSubjectMeta,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "Last studied: " +
                      getDaysAgoText(
                        subject.latestAttempt
                          ? subject.latestAttempt.completedAt
                          : null,
                      ),
                  ),
                ),
              );
            }),
      );
    };

    const renderExamDates = function () {
      const selectedMap = {};
      selectedSubjects.forEach(function (id) {
        selectedMap[id] = true;
      });
      const selectedData = subjectDataList.filter(function (subject) {
        return selectedMap[subject.folder.id];
      });
      return React.createElement(
        View,
        null,
        renderStepHeader(
          "Add Exam Dates",
          "Optional. Add exam dates if you want AI to prioritise upcoming exams.",
        ),
        selectedData.map(function (subject) {
          const dateValue = subjectExamDates[subject.folder.id];
          return React.createElement(
            View,
            {
              key: subject.folder.id,
              style: [
                styles.plannerDateCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerSubjectTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              subject.subjectName,
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerSubjectMeta,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Exam Readiness: " +
                (subject.readiness === null
                  ? "Not enough data"
                  : String(subject.readiness) + "%"),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerSubjectMeta,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Exam date: " +
                (dateValue
                  ? formatReadableDate(dateValue)
                  : "No exam date yet"),
            ),
            React.createElement(
              View,
              { style: styles.plannerSmallButtonRow },
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.plannerSmallButton,
                    { backgroundColor: theme.colors.primary },
                  ],
                  onPress: function () {
                    setDatePickerSubject(subject);
                  },
                },
                React.createElement(
                  Text,
                  { style: styles.plannerSmallButtonText },
                  dateValue ? "Change date" : "Add date",
                ),
              ),
              dateValue
                ? React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.plannerSmallButton,
                        { backgroundColor: theme.colors.error },
                      ],
                      onPress: function () {
                        setSubjectExamDates(function (prev) {
                          const next = Object.assign({}, prev);
                          delete next[subject.folder.id];
                          return next;
                        });
                      },
                    },
                    React.createElement(
                      Text,
                      { style: styles.plannerSmallButtonText },
                      "Remove date",
                    ),
                  )
                : null,
            ),
          );
        }),
      );
    };

    const renderStudyAvailability = function () {
      return React.createElement(
        View,
        null,
        renderStepHeader(
          "Set Study Availability",
          "Tell AI when you are free. You can add more than one study time for each day.",
        ),
        AI_PLANNER_DAYS.map(function (day) {
          const slots = (studyAvailability || {})[day] || [];
          return React.createElement(
            View,
            {
              key: day,
              style: [
                styles.plannerDayCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              View,
              { style: styles.plannerDayHeader },
              React.createElement(
                Text,
                {
                  style: [
                    styles.plannerDayTitle,
                    { color: theme.colors.primary },
                  ],
                },
                day,
              ),
              React.createElement(
                TouchableOpacity,
                {
                  onPress: function () {
                    clearDay(day);
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerClearText,
                      { color: theme.colors.error },
                    ],
                  },
                  "Clear Day",
                ),
              ),
            ),
            slots.length === 0
              ? React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerEmptyText,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "No study time added",
                )
              : null,
            slots.map(function (slot, index) {
              return React.createElement(
                View,
                {
                  key: slot.id,
                  style: [
                    styles.plannerSlotCard,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerSlotTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Study Slot " + (index + 1),
                ),
                React.createElement(
                  View,
                  { style: styles.plannerTimeRow },
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.plannerTimeButton,
                        {
                          borderColor: theme.colors.border,
                          backgroundColor: theme.colors.card,
                        },
                      ],
                      onPress: function () {
                        setTimePickerTarget({
                          type: "study",
                          day: day,
                          slotId: slot.id,
                          field: "startTime",
                          title: "Select Start Time",
                          initialTime: slot.startTime,
                        });
                      },
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerTimeLabel,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      "Start",
                    ),
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerTimeValue,
                          { color: theme.colors.textPrimary },
                        ],
                      },
                      slot.startTime,
                    ),
                  ),
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.plannerTimeButton,
                        {
                          borderColor: theme.colors.border,
                          backgroundColor: theme.colors.card,
                        },
                      ],
                      onPress: function () {
                        setTimePickerTarget({
                          type: "study",
                          day: day,
                          slotId: slot.id,
                          field: "endTime",
                          title: "Select End Time",
                          initialTime: slot.endTime,
                        });
                      },
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerTimeLabel,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      "End",
                    ),
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerTimeValue,
                          { color: theme.colors.textPrimary },
                        ],
                      },
                      slot.endTime,
                    ),
                  ),
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.plannerRemoveSlotButton,
                      { borderColor: theme.colors.border },
                    ],
                    onPress: function () {
                      removeStudySlot(day, slot.id);
                    },
                  },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerRemoveSlotText,
                        { color: theme.colors.error },
                      ],
                    },
                    "Remove Slot",
                  ),
                ),
              );
            }),
            React.createElement(
              View,
              { style: styles.plannerSmallButtonRow },
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.plannerSmallButton,
                    { backgroundColor: theme.colors.accent },
                  ],
                  onPress: function () {
                    addStudySlot(day);
                  },
                },
                React.createElement(
                  Text,
                  { style: styles.plannerSmallButtonText },
                  "+ Add Study Time",
                ),
              ),
              slots.length > 0
                ? React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.plannerSmallButton,
                        { backgroundColor: theme.colors.primary },
                      ],
                      onPress: function () {
                        copyDayToOthers(day);
                      },
                    },
                    React.createElement(
                      Text,
                      { style: styles.plannerSmallButtonText },
                      "Copy to Other Days",
                    ),
                  )
                : null,
            ),
          );
        }),
      );
    };

    const renderExercisePreference = function () {
      return React.createElement(
        View,
        null,
        renderStepHeader(
          "Exercise Preference",
          "Add exercise to help AI balance study, rest and recovery.",
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.plannerQuestionText,
              { color: theme.colors.textPrimary },
            ],
          },
          "How many times do you want to exercise per week?",
        ),
        React.createElement(
          View,
          { style: styles.plannerOptionGrid },
          [0, 1, 2, 3, 4, 5].map(function (num) {
            const selected = exerciseFrequency === num;
            return React.createElement(
              TouchableOpacity,
              {
                key: String(num),
                style: [
                  styles.plannerNumberOption,
                  {
                    backgroundColor: selected
                      ? theme.colors.primary
                      : theme.colors.card,
                    borderColor: selected
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ],
                onPress: function () {
                  setExerciseFrequency(num);
                },
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.plannerNumberOptionText,
                    { color: selected ? "#FFFFFF" : theme.colors.textPrimary },
                  ],
                },
                String(num),
              ),
            );
          }),
        ),
        exerciseFrequency > 0
          ? React.createElement(
              View,
              null,
              React.createElement(
                Text,
                {
                  style: [
                    styles.plannerQuestionText,
                    { color: theme.colors.textPrimary, marginTop: 18 },
                  ],
                },
                "When do you want to exercise?",
              ),
              React.createElement(
                View,
                { style: styles.plannerModeRow },
                ["ai", "manual"].map(function (mode) {
                  const selected = exerciseMode === mode;
                  return React.createElement(
                    TouchableOpacity,
                    {
                      key: mode,
                      style: [
                        styles.plannerModeButton,
                        {
                          backgroundColor: selected
                            ? theme.colors.accent
                            : theme.colors.card,
                          borderColor: selected
                            ? theme.colors.accent
                            : theme.colors.border,
                        },
                      ],
                      onPress: function () {
                        setExerciseMode(mode);
                      },
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.plannerModeButtonText,
                          {
                            color: selected
                              ? "#FFFFFF"
                              : theme.colors.textPrimary,
                          },
                        ],
                      },
                      mode === "ai" ? "Let AI Choose" : "Choose Manually",
                    ),
                  );
                }),
              ),
              exerciseMode === "manual"
                ? React.createElement(
                    View,
                    { style: { marginTop: 14 } },
                    manualExerciseSlots.map(function (slot, index) {
                      return React.createElement(
                        View,
                        {
                          key: slot.id,
                          style: [
                            styles.plannerSlotCard,
                            {
                              backgroundColor: theme.colors.card,
                              borderColor: theme.colors.border,
                            },
                          ],
                        },
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.plannerSlotTitle,
                              { color: theme.colors.textPrimary },
                            ],
                          },
                          "Exercise Slot " + (index + 1),
                        ),
                        React.createElement(
                          ScrollView,
                          {
                            horizontal: true,
                            showsHorizontalScrollIndicator: false,
                            style: { marginBottom: 10 },
                          },
                          AI_PLANNER_DAYS.map(function (day) {
                            const selected = slot.day === day;
                            return React.createElement(
                              TouchableOpacity,
                              {
                                key: day,
                                style: [
                                  styles.plannerDayChip,
                                  {
                                    backgroundColor: selected
                                      ? theme.colors.primary
                                      : theme.colors.background,
                                    borderColor: selected
                                      ? theme.colors.primary
                                      : theme.colors.border,
                                  },
                                ],
                                onPress: function () {
                                  updateExerciseSlot(slot.id, "day", day);
                                },
                              },
                              React.createElement(
                                Text,
                                {
                                  style: [
                                    styles.plannerDayChipText,
                                    {
                                      color: selected
                                        ? "#FFFFFF"
                                        : theme.colors.textPrimary,
                                    },
                                  ],
                                },
                                day.slice(0, 3),
                              ),
                            );
                          }),
                        ),
                        React.createElement(
                          View,
                          { style: styles.plannerTimeRow },
                          React.createElement(
                            TouchableOpacity,
                            {
                              style: [
                                styles.plannerTimeButton,
                                {
                                  borderColor: theme.colors.border,
                                  backgroundColor: theme.colors.background,
                                },
                              ],
                              onPress: function () {
                                setTimePickerTarget({
                                  type: "exercise",
                                  slotId: slot.id,
                                  field: "startTime",
                                  title: "Select Start Time",
                                  initialTime: slot.startTime,
                                });
                              },
                            },
                            React.createElement(
                              Text,
                              {
                                style: [
                                  styles.plannerTimeLabel,
                                  { color: theme.colors.textSecondary },
                                ],
                              },
                              "Start",
                            ),
                            React.createElement(
                              Text,
                              {
                                style: [
                                  styles.plannerTimeValue,
                                  { color: theme.colors.textPrimary },
                                ],
                              },
                              slot.startTime,
                            ),
                          ),
                          React.createElement(
                            TouchableOpacity,
                            {
                              style: [
                                styles.plannerTimeButton,
                                {
                                  borderColor: theme.colors.border,
                                  backgroundColor: theme.colors.background,
                                },
                              ],
                              onPress: function () {
                                setTimePickerTarget({
                                  type: "exercise",
                                  slotId: slot.id,
                                  field: "endTime",
                                  title: "Select End Time",
                                  initialTime: slot.endTime,
                                });
                              },
                            },
                            React.createElement(
                              Text,
                              {
                                style: [
                                  styles.plannerTimeLabel,
                                  { color: theme.colors.textSecondary },
                                ],
                              },
                              "End",
                            ),
                            React.createElement(
                              Text,
                              {
                                style: [
                                  styles.plannerTimeValue,
                                  { color: theme.colors.textPrimary },
                                ],
                              },
                              slot.endTime,
                            ),
                          ),
                        ),
                        React.createElement(
                          TouchableOpacity,
                          {
                            style: [
                              styles.plannerRemoveSlotButton,
                              { borderColor: theme.colors.border },
                            ],
                            onPress: function () {
                              removeExerciseSlot(slot.id);
                            },
                          },
                          React.createElement(
                            Text,
                            {
                              style: [
                                styles.plannerRemoveSlotText,
                                { color: theme.colors.error },
                              ],
                            },
                            "Remove Slot",
                          ),
                        ),
                      );
                    }),
                    React.createElement(
                      TouchableOpacity,
                      {
                        style: [
                          styles.primaryButton,
                          {
                            backgroundColor: theme.colors.accent,
                            marginTop: 10,
                          },
                        ],
                        onPress: addExerciseSlot,
                      },
                      React.createElement(MaterialIcons, {
                        name: "fitness-center",
                        size: 20,
                        color: "#FFFFFF",
                      }),
                      React.createElement(
                        Text,
                        { style: styles.primaryButtonText },
                        "+ Add Exercise Time",
                      ),
                    ),
                  )
                : React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerHelperText,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "AI will spread exercise sessions across the week without overlapping your study time.",
                  ),
            )
          : React.createElement(
              Text,
              {
                style: [
                  styles.plannerHelperText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "AI will not add exercise blocks to this schedule.",
            ),
      );
    };

    const renderGenerate = function () {
      const preview = buildPlannerScheduleFromSettings(
        subjectDataList,
        selectedSubjects,
        subjectExamDates,
        studyAvailability,
        exerciseFrequency,
        exerciseMode,
        manualExerciseSlots,
      );
      return React.createElement(
        View,
        null,
        renderStepHeader(
          "Generate AI Schedule",
          "AI will now create a weekly plan using your subjects, exam dates, readiness and availability.",
        ),
        React.createElement(
          View,
          {
            style: [
              styles.plannerSummaryCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.plannerSubjectTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Schedule Summary",
          ),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Selected subjects",
            value: String(selectedSubjects.length),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Study slots",
            value: String(allStudySlots.length),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Exercise sessions",
            value: String(exerciseFrequency),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Preview items",
            value: String(preview.length),
          }),
        ),
        preview.slice(0, 6).map(function (item) {
          return React.createElement(PlannerScheduleItemCard, {
            key: item.id,
            theme: theme,
            item: item,
            status: "Upcoming",
          });
        }),
        preview.length > 6
          ? React.createElement(
              Text,
              {
                style: [
                  styles.plannerHelperText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "+" +
                String(preview.length - 6) +
                " more session(s) will be shown in Progress.",
            )
          : null,
      );
    };

    if (!plannerStarted) {
      return renderPlannerStart();
    }

    const stepContent =
      step === 1
        ? renderChooseSubjects()
        : step === 2
          ? renderExamDates()
          : step === 3
            ? renderStudyAvailability()
            : step === 4
              ? renderExercisePreference()
              : renderGenerate();

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top || 0,
        title: "AI Planner",
        showBack: true,
        onBack:
          step > 1
            ? function () {
                setStep(Math.max(1, step - 1));
              }
            : exitPlannerFlow,
        showNext: step < 5,
        onNext: goNext,
      }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1 },
          contentContainerStyle: {
            padding: 20,
            paddingTop: 18,
            paddingBottom: 240 + (insets.bottom || 0),
          },
        },
        stepContent,
      ),
      React.createElement(
        View,
        {
          style: [
            styles.plannerBottomBar,
            {
              backgroundColor: theme.colors.card,
              borderTopColor: theme.colors.border,
              bottom: 82 + (insets.bottom || 0),
              paddingBottom: 12,
            },
          ],
        },
        step > 1
          ? React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.plannerBottomButton,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ],
                onPress: function () {
                  setStep(Math.max(1, step - 1));
                },
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.plannerBottomButtonText,
                    { color: theme.colors.primary },
                  ],
                },
                "Back",
              ),
            )
          : React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.plannerBottomButton,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ],
                onPress: exitPlannerFlow,
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.plannerBottomButtonText,
                    { color: theme.colors.primary },
                  ],
                },
                "Cancel",
              ),
            ),
        step < 5
          ? React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.plannerBottomButton,
                  {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                    flex: 1,
                  },
                ],
                onPress: goNext,
              },
              React.createElement(
                Text,
                {
                  style: [styles.plannerBottomButtonText, { color: "#FFFFFF" }],
                },
                "Continue",
              ),
            )
          : React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.plannerBottomButton,
                  {
                    backgroundColor: theme.colors.accent,
                    borderColor: theme.colors.accent,
                    flex: 1,
                  },
                ],
                onPress: saveGeneratedSchedule,
                disabled: savingPlan,
              },
              savingPlan
                ? React.createElement(ActivityIndicator, { color: "#FFFFFF" })
                : React.createElement(
                    Text,
                    {
                      style: [
                        styles.plannerBottomButtonText,
                        { color: "#FFFFFF" },
                      ],
                    },
                    hasExistingGeneratedSchedule
                      ? "Update AI Schedule"
                      : "Generate AI Schedule",
                  ),
            ),
      ),
      React.createElement(CountdownDatePickerModal, {
        visible: !!datePickerSubject,
        initialParts:
          datePickerSubject && subjectExamDates[datePickerSubject.folder.id]
            ? parseDateToParts(subjectExamDates[datePickerSubject.folder.id])
            : parseDateToParts(new Date().toISOString()),
        onClose: function () {
          setDatePickerSubject(null);
        },
        onConfirm: function (parts) {
          const selected = new Date(parts.year, parts.monthIndex, parts.day);
          if (
            startOfLocalDay(selected).getTime() <
            startOfLocalDay(new Date()).getTime()
          ) {
            showMessage("Invalid Date", "Past dates cannot be selected.");
            return;
          }
          if (datePickerSubject) {
            setSubjectExamDates(function (prev) {
              const next = Object.assign({}, prev);
              next[datePickerSubject.folder.id] = selected.toISOString();
              return next;
            });
          }
          setDatePickerSubject(null);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(PlannerTimePickerModal, {
        visible: !!timePickerTarget,
        title: timePickerTarget ? timePickerTarget.title : "Select Time",
        initialTime: timePickerTarget
          ? timePickerTarget.initialTime
          : "3:30 PM",
        onClose: function () {
          setTimePickerTarget(null);
        },
        onSave: function (value) {
          if (timePickerTarget && timePickerTarget.type === "study") {
            updateStudySlotTime(
              timePickerTarget.day,
              timePickerTarget.slotId,
              timePickerTarget.field,
              value,
            );
          }
          if (timePickerTarget && timePickerTarget.type === "exercise") {
            updateExerciseSlot(
              timePickerTarget.slotId,
              timePickerTarget.field,
              value,
            );
          }
          setTimePickerTarget(null);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "aiPlan",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const PlannerTodayAIPlanCard = function (props) {
    const theme = props.theme;
    const schedule = props.schedule || [];
    const completedSessions = props.completedSessions || {};
    const [showFullSchedule, setShowFullSchedule] = useState(false);
    const nowNext = getScheduleNowAndNext(
      schedule,
      completedSessions,
      new Date(),
    );

    const toggleDone = function (item) {
      if (props.onToggleDone) props.onToggleDone(item);
    };

    if (schedule.length === 0) {
      return React.createElement(
        View,
        {
          style: [
            styles.plannerTodayCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              marginTop: props.compactTop ? 0 : 16,
            },
          ],
        },
        React.createElement(
          Text,
          {
            style: [styles.plannerTodayTitle, { color: theme.colors.primary }],
          },
          "Today’s AI Plan",
        ),
        React.createElement(
          View,
          {
            style: [
              styles.plannerMiniEmptyBox,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.plannerSubjectTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "No AI schedule yet",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.plannerHelperText,
                { color: theme.colors.textSecondary },
              ],
            },
            "Generate an AI study schedule to see today’s plan here.",
          ),
        ),
        props.onCreateAIPlan
          ? React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary, marginTop: 10 },
                ],
                onPress: props.onCreateAIPlan,
              },
              React.createElement(MaterialIcons, {
                name: "auto-awesome",
                size: 20,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.primaryButtonText },
                "Create AI Plan",
              ),
            )
          : null,
      );
    }

    return React.createElement(
      View,
      {
        style: [
          styles.plannerTodayCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            marginTop: props.compactTop ? 0 : 16,
          },
        ],
      },
      React.createElement(
        Text,
        { style: [styles.plannerTodayTitle, { color: theme.colors.primary }] },
        "Today’s AI Plan",
      ),
      nowNext.current
        ? React.createElement(PlannerScheduleItemCard, {
            theme: theme,
            item: nowNext.current,
            status: "Now",
            onToggleDone: toggleDone,
          })
        : React.createElement(
            View,
            {
              style: [
                styles.plannerMiniEmptyBox,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerSubjectTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              "No current session",
            ),
            nowNext.next
              ? React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerHelperText,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Next session: " +
                    (nowNext.next.subject || nowNext.next.taskTitle) +
                    " • " +
                    nowNext.next.startTime,
                )
              : React.createElement(
                  Text,
                  {
                    style: [
                      styles.plannerHelperText,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "No upcoming session found.",
                ),
          ),
      nowNext.next
        ? React.createElement(PlannerScheduleItemCard, {
            theme: theme,
            item: nowNext.next,
            status: "Up Next",
            onToggleDone: toggleDone,
          })
        : null,
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.primaryButton,
            { backgroundColor: theme.colors.primary, marginTop: 10 },
          ],
          onPress: function () {
            setShowFullSchedule(true);
          },
        },
        React.createElement(MaterialIcons, {
          name: "calendar-month",
          size: 20,
          color: "#FFFFFF",
        }),
        React.createElement(
          Text,
          { style: styles.primaryButtonText },
          "View Full Weekly Schedule",
        ),
      ),
      React.createElement(PlannerFullScheduleModal, {
        visible: showFullSchedule,
        onClose: function () {
          setShowFullSchedule(false);
        },
        schedule: schedule,
        completedSessions: completedSessions,
        onToggleDone: toggleDone,
        theme: theme,
        insetsTop: props.insetsTop,
        insetsBottom: props.insetsBottom,
      }),
    );
  };

  const AIWeeklyPlanSection = function (props) {
    const theme = props.theme;
    const schedule = props.schedule || [];
    const completedSessions = props.completedSessions || {};
    const [showFullSchedule, setShowFullSchedule] = useState(false);
    const nowNext = getScheduleNowAndNext(
      schedule,
      completedSessions,
      new Date(),
    );
    const todayName = getTodayDayName();
    const todayItems = schedule
      .filter(function (item) {
        return item.day === todayName;
      })
      .slice(0, 3);

    if (schedule.length === 0) {
      return React.createElement(
        View,
        {
          style: [
            styles.progressInfoCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              marginTop: 16,
            },
          ],
        },
        React.createElement(
          Text,
          {
            style: [
              styles.progressInfoCardTitle,
              { color: theme.colors.textPrimary },
            ],
          },
          "No AI schedule yet",
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.progressDetailMessage,
              { color: theme.colors.textSecondary },
            ],
          },
          "Generate an AI study schedule to see your weekly plan here.",
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.primaryButton,
              { backgroundColor: theme.colors.primary, marginTop: 14 },
            ],
            onPress: props.onCreateAIPlan,
          },
          React.createElement(MaterialIcons, {
            name: "auto-awesome",
            size: 20,
            color: "#FFFFFF",
          }),
          React.createElement(
            Text,
            { style: styles.primaryButtonText },
            "Create AI Plan",
          ),
        ),
      );
    }

    const toggleDone = function (item) {
      if (props.onToggleDone) props.onToggleDone(item);
    };

    return React.createElement(
      View,
      { style: { marginTop: 18 } },
      React.createElement(
        Text,
        {
          style: [
            styles.progressSectionTitle,
            { color: theme.colors.textPrimary },
          ],
        },
        "AI Weekly Plan",
      ),
      React.createElement(PlannerTodayAIPlanCard, {
        theme: theme,
        schedule: schedule,
        completedSessions: completedSessions,
        onToggleDone: toggleDone,
        onCreateAIPlan: props.onCreateAIPlan,
        compactTop: true,
        insetsTop: props.insetsTop,
        insetsBottom: props.insetsBottom,
      }),
      todayItems.length > 0
        ? React.createElement(
            View,
            { style: { marginTop: 12 } },
            React.createElement(
              Text,
              {
                style: [
                  styles.plannerPreviewLabel,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Weekly Plan Preview",
            ),
            todayItems.map(function (item) {
              return React.createElement(PlannerScheduleItemCard, {
                key: "preview_" + item.id,
                theme: theme,
                item: item,
                status: getScheduleItemComputedStatus(
                  item,
                  completedSessions,
                  new Date(),
                ),
                onToggleDone: toggleDone,
              });
            }),
          )
        : null,
      React.createElement(PlannerFullScheduleModal, {
        visible: showFullSchedule,
        onClose: function () {
          setShowFullSchedule(false);
        },
        schedule: schedule,
        completedSessions: completedSessions,
        onToggleDone: toggleDone,
        theme: theme,
        insetsTop: props.insetsTop,
        insetsBottom: props.insetsBottom,
      }),
    );
  };

  const ProgressScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");
    const { data: quizzesData, refetch: refetchQuizzes } = useQuery("quizzes");
    const { data: attemptLogsData, refetch: refetchAttempts } =
      useQuery("attemptLogs");
    const { data: plannerData, refetch: refetchPlanner } =
      useQuery("aiPlannerSchedule");
    const { mutate: updatePlanner } = useMutation(
      "aiPlannerSchedule",
      "update",
    );
    const { mutate: insertPlanner } = useMutation(
      "aiPlannerSchedule",
      "insert",
    );
    const [localCompletedSessions, setLocalCompletedSessions] = useState({});

    useEffect(
      function () {
        if (props.refreshToken) {
          if (refetchFolders) refetchFolders();
          if (refetchQuizzes) refetchQuizzes();
          if (refetchAttempts) refetchAttempts();
          if (refetchPlanner) refetchPlanner();
        }
      },
      [props.refreshToken],
    );

    const folders = Array.isArray(foldersData) ? foldersData : [];
    const quizzes = Array.isArray(quizzesData) ? quizzesData : [];
    const attemptLogs = Array.isArray(attemptLogsData) ? attemptLogsData : [];
    const subjects = getFoldersAsSubjects(folders, quizzes);
    const subjectDataList = subjects.map(function (folder) {
      return buildProgressDataForSubject(folder, quizzes, attemptLogs);
    });
    const overall = buildOverallProgressData(subjectDataList);
    const plannerRecord = getLatestPlannerRecord(plannerData);
    const generatedSchedule = normalizeStoredSchedule(plannerRecord);
    const savedCompletedSessions =
      plannerRecord && plannerRecord.completedSessions
        ? plannerRecord.completedSessions
        : {};
    const completedSessions = Object.assign(
      {},
      savedCompletedSessions,
      localCompletedSessions,
    );

    useEffect(
      function () {
        setLocalCompletedSessions(savedCompletedSessions || {});
      },
      [plannerRecord ? plannerRecord.scheduleGeneratedAt : ""],
    );

    const saveCompletedSessions = function (nextCompleted) {
      setLocalCompletedSessions(nextCompleted);
      if (!plannerRecord) return;
      const nextRecord = Object.assign({}, plannerRecord, {
        completedSessions: nextCompleted,
        updatedAt: new Date().toISOString(),
      });
      updatePlanner(nextRecord)
        .then(function () {
          if (refetchPlanner) refetchPlanner();
        })
        .catch(function () {
          insertPlanner(
            Object.assign({}, nextRecord, {
              id: plannerRecord.id || "current_weekly_plan",
              createdAt: plannerRecord.createdAt || new Date().toISOString(),
            }),
          ).catch(function () {
            return null;
          });
        });
    };

    const toggleDone = function (item) {
      const next = Object.assign({}, completedSessions);
      if (next[item.id]) {
        delete next[item.id];
      } else {
        next[item.id] = new Date().toISOString();
      }
      saveCompletedSessions(next);
    };

    const renderEmptyState = function () {
      return React.createElement(
        View,
        {
          style: [
            styles.progressEmptyCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
        },
        React.createElement(MaterialIcons, {
          name: "folder-open",
          size: 44,
          color: theme.colors.accent,
        }),
        React.createElement(
          Text,
          {
            style: [
              styles.progressEmptyTitle,
              { color: theme.colors.textPrimary },
            ],
          },
          "Better to study than being too late",
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.progressEmptyText,
              { color: theme.colors.textSecondary },
            ],
          },
          "Create a subject folder in Quizzes to start tracking your progress.",
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.primaryButton,
              { backgroundColor: theme.colors.primary, marginTop: 16 },
            ],
            activeOpacity: 0.84,
            onPress: function () {
              if (props.onOpenQuizzes) props.onOpenQuizzes();
            },
          },
          React.createElement(MaterialIcons, {
            name: "article",
            size: 20,
            color: "#FFFFFF",
          }),
          React.createElement(
            Text,
            { style: styles.primaryButtonText },
            "Open Quizzes",
          ),
        ),
      );
    };

    const renderOverallCard = function () {
      if (subjectDataList.length === 0) return null;
      return React.createElement(
        View,
        {
          style: [
            styles.progressOverallCard,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            },
          ],
        },
        React.createElement(
          View,
          { style: styles.progressOverallHeader },
          React.createElement(
            View,
            { style: { flex: 1, paddingRight: 12 } },
            React.createElement(
              Text,
              { style: styles.progressOverallTitle },
              "Overall Exam Readiness",
            ),
            React.createElement(
              Text,
              { style: styles.progressOverallSubtitle },
              overall.readiness === null
                ? "Not enough data"
                : formatPercentText(overall.readiness) + " ready",
            ),
          ),
          React.createElement(
            View,
            { style: styles.progressOverallBadge },
            React.createElement(
              Text,
              { style: styles.progressOverallBadgeText },
              overall.readiness === null
                ? "Not enough data"
                : String(Math.round(overall.readiness)) + "%",
            ),
          ),
        ),
        React.createElement(
          View,
          { style: styles.progressOverallGrid },
          React.createElement(
            View,
            { style: styles.progressOverallMiniBox },
            React.createElement(
              Text,
              { style: styles.progressOverallMiniValue },
              formatPercentText(overall.averageScore),
            ),
            React.createElement(
              Text,
              { style: styles.progressOverallMiniLabel },
              "Average score",
            ),
          ),
          React.createElement(
            View,
            { style: styles.progressOverallMiniBox },
            React.createElement(
              Text,
              { style: styles.progressOverallMiniValue },
              String(overall.monthlyQuestions || 0),
            ),
            React.createElement(
              Text,
              { style: styles.progressOverallMiniLabel },
              "Questions this month",
            ),
          ),
          React.createElement(
            View,
            { style: styles.progressOverallMiniBox },
            React.createElement(
              Text,
              { style: styles.progressOverallMiniValue },
              String(overall.streak.currentStreak || 0),
            ),
            React.createElement(
              Text,
              { style: styles.progressOverallMiniLabel },
              "Study streak",
            ),
          ),
        ),
      );
    };

    const renderSubjectCard = function (subjectData) {
      const zone = getReadinessZone(subjectData.readiness, theme);
      return React.createElement(
        TouchableOpacity,
        {
          key: subjectData.folder.id,
          style: [
            styles.progressSubjectCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
          activeOpacity: 0.86,
          onPress: function () {
            if (props.onOpenSubject) props.onOpenSubject(subjectData.folder.id);
          },
        },
        React.createElement(
          View,
          { style: styles.progressSubjectTopRow },
          React.createElement(
            View,
            {
              style: [
                styles.progressSubjectIcon,
                { backgroundColor: theme.colors.lavender },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "folder",
              size: 24,
              color: theme.colors.accent,
            }),
          ),
          React.createElement(
            View,
            { style: { flex: 1, paddingRight: 10 } },
            React.createElement(
              Text,
              {
                style: [
                  styles.progressSubjectTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              subjectData.subjectName,
            ),
            React.createElement(
              Text,
              {
                style: [styles.progressSubjectReadiness, { color: zone.color }],
              },
              subjectData.readiness === null
                ? "Not enough data"
                : String(subjectData.readiness) + "% ready",
            ),
          ),
          React.createElement(MaterialIcons, {
            name: "chevron-right",
            size: 24,
            color: theme.colors.textSecondary,
          }),
        ),
        React.createElement(ProgressMetricRow, {
          theme: theme,
          label: "Average score",
          value: formatPercentText(subjectData.averageScore),
        }),
        React.createElement(ProgressMetricRow, {
          theme: theme,
          label: "Questions this month",
          value: String(subjectData.monthlyQuestions || 0),
        }),
        React.createElement(ProgressMetricRow, {
          theme: theme,
          label: "Study streak",
          value: String(subjectData.streak.currentStreak || 0) + " day streak",
        }),
        React.createElement(ProgressMetricRow, {
          theme: theme,
          label: "Quizzes",
          value:
            String(subjectData.quizzes.length) +
            " quiz" +
            (subjectData.quizzes.length === 1 ? "" : "zes"),
        }),
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          contentContainerStyle: {
            padding: 20,
            paddingTop: 48 + (insets.top || 0),
            paddingBottom: 140 + (insets.bottom || 0),
          },
        },
        React.createElement(
          View,
          { style: styles.progressHeaderBlock },
          React.createElement(
            Text,
            {
              style: [
                styles.progressLargeTitle,
                { color: theme.colors.primary },
              ],
            },
            "Progress",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.progressSubtitle,
                { color: theme.colors.textSecondary },
              ],
            },
            "Track your exam readiness by subject",
          ),
        ),
        subjectDataList.length === 0 ? renderEmptyState() : renderOverallCard(),
        React.createElement(AIWeeklyPlanSection, {
          theme: theme,
          schedule: generatedSchedule,
          completedSessions: completedSessions,
          onToggleDone: toggleDone,
          onCreateAIPlan: props.onCreateAIPlan,
          insetsTop: insets.top,
          insetsBottom: insets.bottom,
        }),
        subjectDataList.length > 0
          ? React.createElement(
              View,
              { style: { marginTop: 22 } },
              React.createElement(
                Text,
                {
                  style: [
                    styles.progressSectionTitle,
                    { color: theme.colors.textPrimary },
                  ],
                },
                "Subject Progress",
              ),
              subjectDataList.map(renderSubjectCard),
            )
          : null,
      ),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "progress",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const ProgressSubjectDetailScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");
    const { data: quizzesData, refetch: refetchQuizzes } = useQuery("quizzes");
    const { data: attemptLogsData, refetch: refetchAttempts } =
      useQuery("attemptLogs");

    useEffect(
      function () {
        if (refetchFolders) refetchFolders();
        if (refetchQuizzes) refetchQuizzes();
        if (refetchAttempts) refetchAttempts();
      },
      [props.folderId],
    );

    const folders = Array.isArray(foldersData) ? foldersData : [];
    const quizzes = Array.isArray(quizzesData) ? quizzesData : [];
    const attemptLogs = Array.isArray(attemptLogsData) ? attemptLogsData : [];
    const subjects = getFoldersAsSubjects(folders, quizzes);
    const selectedFolder =
      subjects.find(function (folder) {
        return folder.id === props.folderId;
      }) || null;
    const subjectData = selectedFolder
      ? buildProgressDataForSubject(selectedFolder, quizzes, attemptLogs)
      : null;
    const zone = getReadinessZone(
      subjectData ? subjectData.readiness : null,
      theme,
    );

    if (!selectedFolder || !subjectData) {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: insets.top,
          title: "Progress",
          showBack: true,
          onBack: props.onBack,
          showNext: false,
        }),
        React.createElement(
          View,
          { style: styles.emptyStateWrap },
          React.createElement(
            Text,
            {
              style: [
                styles.emptyStateTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Subject not found",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.emptyStateText,
                { color: theme.colors.textSecondary },
              ],
            },
            "This folder may have been renamed or deleted.",
          ),
        ),
      );
    }

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: subjectData.subjectName + " Progress",
        showBack: true,
        onBack: props.onBack,
        showNext: false,
      }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          contentContainerStyle: {
            padding: 16,
            paddingBottom: 100 + (insets.bottom || 0),
          },
        },
        React.createElement(
          ProgressInfoCard,
          {
            theme: theme,
            title: "Exam Readiness",
            icon: "verified",
            iconColor: zone.color,
            iconBackground: theme.colors.background,
          },
          React.createElement(
            Text,
            { style: [styles.progressDetailBigNumber, { color: zone.color }] },
            subjectData.readiness === null
              ? "Not enough data"
              : String(subjectData.readiness) + "%",
          ),
          React.createElement(
            Text,
            { style: [styles.progressZoneText, { color: zone.color }] },
            zone.label,
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.progressDetailMessage,
                { color: theme.colors.textSecondary },
              ],
            },
            zone.message,
          ),
        ),
        React.createElement(
          ProgressInfoCard,
          { theme: theme, title: "Average Score", icon: "analytics" },
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Average score percentage",
            value: formatPercentText(subjectData.averageScore),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Average correct marks",
            value:
              subjectData.averageCorrectMarks === null
                ? "—"
                : subjectData.averageCorrectMarks.toFixed(2),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Total attempts",
            value: String(subjectData.attempts.length),
          }),
        ),
        React.createElement(
          ProgressInfoCard,
          { theme: theme, title: "Monthly Practice", icon: "calendar-month" },
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Questions practised this month",
            value: String(subjectData.monthlyQuestions || 0),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Quizzes attempted this month",
            value: String(subjectData.monthlyAttempts || 0),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Latest practice date",
            value: subjectData.latestAttempt
              ? formatShortDate(subjectData.latestAttempt.completedAt)
              : "—",
          }),
        ),
        React.createElement(
          ProgressInfoCard,
          {
            theme: theme,
            title: "Study Streak",
            icon: "local-fire-department",
          },
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Current streak",
            value:
              String(subjectData.streak.currentStreak || 0) +
              " day" +
              (subjectData.streak.currentStreak === 1 ? "" : "s"),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Best streak",
            value:
              String(subjectData.streak.bestStreak || 0) +
              " day" +
              (subjectData.streak.bestStreak === 1 ? "" : "s"),
          }),
          React.createElement(ProgressMetricRow, {
            theme: theme,
            label: "Most recent active study date",
            value: subjectData.streak.latestDate
              ? formatShortDate(subjectData.streak.latestDate)
              : "—",
          }),
        ),
        React.createElement(
          ProgressInfoCard,
          { theme: theme, title: "Weak Area", icon: "warning" },
          subjectData.weakestQuiz
            ? React.createElement(
                View,
                null,
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "Weakest quiz",
                  value: subjectData.weakestQuiz.quiz.title || "Untitled Quiz",
                }),
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "Lowest average score quiz",
                  value: formatPercentText(
                    subjectData.weakestQuiz.averageScore,
                  ),
                  color: theme.colors.error,
                }),
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "Wrong or skipped questions",
                  value: String(subjectData.weakestQuiz.wrongSkipped || 0),
                }),
              )
            : React.createElement(
                Text,
                {
                  style: [
                    styles.progressDetailMessage,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Not enough data yet. Complete more quizzes in this subject to unlock deeper progress.",
              ),
        ),
        React.createElement(
          ProgressInfoCard,
          { theme: theme, title: "Improvement Trend", icon: "trending-up" },
          subjectData.improvementTrend
            ? React.createElement(
                View,
                null,
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "First attempts average",
                  value: formatPercentText(
                    subjectData.improvementTrend.firstAverage,
                  ),
                }),
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "Latest attempts average",
                  value: formatPercentText(
                    subjectData.improvementTrend.latestAverage,
                  ),
                }),
                React.createElement(ProgressMetricRow, {
                  theme: theme,
                  label: "Improvement",
                  value:
                    (subjectData.improvementTrend.difference >= 0 ? "+" : "") +
                    String(subjectData.improvementTrend.difference) +
                    "%",
                  color:
                    subjectData.improvementTrend.difference >= 0
                      ? theme.colors.success
                      : theme.colors.error,
                }),
              )
            : React.createElement(
                Text,
                {
                  style: [
                    styles.progressDetailMessage,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Complete more attempts to see your improvement trend.",
              ),
        ),
        React.createElement(
          ProgressInfoCard,
          {
            theme: theme,
            title: "Recommended Action",
            icon: "tips-and-updates",
          },
          React.createElement(
            Text,
            {
              style: [
                styles.progressRecommendationText,
                { color: theme.colors.textPrimary },
              ],
            },
            getProgressRecommendation(subjectData),
          ),
        ),
      ),
    );
  };

  const BlankUtilityScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(
        View,
        {
          style: {
            flex: 1,
            paddingTop: 48 + (insets.top || 0),
            paddingHorizontal: 24,
            paddingBottom: 96 + (insets.bottom || 0),
          },
        },
        React.createElement(
          View,
          { style: { flex: 1 } },
          React.createElement(
            Text,
            {
              style: {
                fontSize: 34,
                lineHeight: 40,
                fontWeight: "900",
                letterSpacing: -0.6,
                color: theme.colors.primary,
                marginBottom: 8,
              },
            },
            props.title || "",
          ),
        ),
      ),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: props.active,
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const WELLBEING_SAFETY_MESSAGE =
    "I’m really sorry you’re going through this. I can’t continue this as a normal chat because your safety or someone else’s safety may be involved.\n\nPlease contact a trusted adult, school counsellor, teacher, parent, guardian, or emergency support immediately.\n\nCounsellor contact:\n0123456789";

  const wellbeingSafetyKeywords = [
    "self-harm",
    "self harm",
    "suicide",
    "kill myself",
    "killing myself",
    "hurt myself",
    "harm myself",
    "harming myself",
    "abuse",
    "abused",
    "rape",
    "violence",
    "violent",
    "kill someone",
    "killing someone",
    "hurt someone",
    "harming someone",
    "crime",
    "steal",
    "stealing",
    "murder",
    "weapon",
    "bomb",
    "evil",
    "harming",
    "danger",
    "unsafe",
  ];

  const containsWellbeingSafetyConcern = function (message) {
    const raw = message ? String(message).toLowerCase() : "";
    if (!raw.trim()) return false;

    return wellbeingSafetyKeywords.some(function (keyword) {
      return raw.indexOf(keyword) >= 0;
    });
  };

  const buildWellbeingCompanionReply = function (message) {
    const raw = message ? String(message).trim() : "";
    const lower = raw.toLowerCase();

    if (!raw) {
      return "I’m here with you. Try writing one sentence about what you feel right now. We can take it slowly, one small step at a time.";
    }

    if (
      lower.indexOf("exam") >= 0 ||
      lower.indexOf("test") >= 0 ||
      lower.indexOf("quiz") >= 0 ||
      lower.indexOf("study") >= 0 ||
      lower.indexOf("homework") >= 0
    ) {
      return "That sounds like a lot to carry as a student. Your feeling makes sense, especially when work and expectations pile up. Take one slow breath, then choose only one small task to start. You can begin with five minutes or one question.";
    }

    if (
      lower.indexOf("tired") >= 0 ||
      lower.indexOf("exhausted") >= 0 ||
      lower.indexOf("sleepy") >= 0 ||
      lower.indexOf("drained") >= 0
    ) {
      return "I hear you. Feeling tired can make even simple tasks feel heavy. Pause for a moment, relax your shoulders, and give yourself permission to slow down. Start again with one gentle task after a short rest.";
    }

    if (
      lower.indexOf("stress") >= 0 ||
      lower.indexOf("stressed") >= 0 ||
      lower.indexOf("pressure") >= 0 ||
      lower.indexOf("panic") >= 0 ||
      lower.indexOf("worried") >= 0
    ) {
      return "I’m sorry you’re feeling this pressure. It makes sense to feel stressed when many things feel urgent at once. Take a deep breath and name only the next thing you can control. Handle that first, not the whole problem.";
    }

    if (
      lower.indexOf("unmotivated") >= 0 ||
      lower.indexOf("lazy") >= 0 ||
      lower.indexOf("no motivation") >= 0 ||
      lower.indexOf("give up") >= 0
    ) {
      return "It’s okay to have low motivation sometimes. It does not mean you are failing. Make the first step very small, like opening your notes or answering one question. Small progress still counts.";
    }

    if (
      lower.indexOf("sad") >= 0 ||
      lower.indexOf("cry") >= 0 ||
      lower.indexOf("upset") >= 0 ||
      lower.indexOf("overwhelmed") >= 0 ||
      lower.indexOf("too much") >= 0
    ) {
      return "That sounds heavy, and I’m glad you shared it. Your feelings are valid. Try grounding yourself by noticing one thing you can see, hear, and feel. Then choose one manageable next step for today.";
    }

    return "Thank you for sharing that with me. It sounds like you’re going through a difficult moment, and that feeling makes sense. Let’s slow things down with one steady breath. For now, choose one small next step that feels manageable.";
  };

  const WellbeingScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const [chatVisible, setChatVisible] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [safetyLocked, setSafetyLocked] = useState(false);
    const wellbeingChatHydratedRef = useRef(false);
    const { data: wellbeingChatsData, loading: wellbeingChatsLoading } =
      useQuery("wellbeingChats");
    const { mutate: saveWellbeingChatMutation } = useMutation(
      "wellbeingChats",
      "update",
    );

    const moodOptions = [
      {
        id: "great",
        label: "😄 Great",
        question:
          "That’s nice to hear. What happened today that made you feel great?",
      },
      {
        id: "okay",
        label: "Okay",
        question:
          "I’m glad you’re doing okay. What has your day been like so far?",
      },
      {
        id: "tired",
        label: "😐 Tired",
        question: "I hear you. What made you feel tired today?",
      },
      {
        id: "stressed",
        label: "😟 Stressed",
        question:
          "I’m sorry you’re feeling stressed. What is making you feel this way?",
      },
      {
        id: "overwhelmed",
        label: "😢 Overwhelmed",
        question: "That sounds heavy. What feels like too much right now?",
      },
    ];

    const quickHelpOptions = [
      {
        id: "calm",
        label: "Calm me down",
        response:
          "Let’s slow things down. Take one deep breath in, hold for a moment, and breathe out slowly. You are safe in this moment. Focus only on the next small step, not everything at once.",
      },
      {
        id: "stress",
        label: "I feel stressed",
        response:
          "I’m sorry you’re feeling stressed. Pause for a moment and unclench your shoulders. Choose only one thing to handle first. You do not need to solve everything right now.",
      },
      {
        id: "unmotivated",
        label: "I feel unmotivated",
        response:
          "It’s okay to feel unmotivated sometimes. Start very small: open one topic, read for 5 minutes, or answer just one question. Small progress still counts.",
      },
      {
        id: "encouragement",
        label: "I need encouragement",
        response:
          "You are still trying, and that matters. One difficult day does not define your ability. Take a short breath, trust your effort, and continue with one manageable task.",
      },
    ];

    useEffect(
      function () {
        if (wellbeingChatsLoading || wellbeingChatHydratedRef.current) return;
        const savedChat =
          Array.isArray(wellbeingChatsData) && wellbeingChatsData.length
            ? wellbeingChatsData.find(function (item) {
                return item && item.id === "wellbeing_current";
              }) || wellbeingChatsData[0]
            : null;

        if (savedChat && Array.isArray(savedChat.messages)) {
          setChatMessages(savedChat.messages);
          setSafetyLocked(!!savedChat.safetyLocked);
          setChatVisible(savedChat.messages.length > 0);
        }

        wellbeingChatHydratedRef.current = true;
      },
      [wellbeingChatsLoading, wellbeingChatsData],
    );

    useEffect(
      function () {
        if (!wellbeingChatHydratedRef.current || wellbeingChatsLoading) return;
        saveWellbeingChatMutation({
          id: "wellbeing_current",
          messages: Array.isArray(chatMessages) ? chatMessages : [],
          safetyLocked: !!safetyLocked,
          updatedAt: new Date().toISOString(),
        }).catch(function () {
          showMessage(
            "Wellbeing Save Error",
            "Your wellbeing chat could not be saved locally just now.",
          );
        });
      },
      [chatMessages, safetyLocked, wellbeingChatsLoading],
    );

    const openChatWithAssistantMessage = function (message) {
      setSafetyLocked(false);
      setChatVisible(true);
      setChatMessages([
        {
          id: makeId("wellbeing_ai", "open"),
          sender: "ai",
          text: message,
          createdAt: new Date().toISOString(),
        },
      ]);
      setChatInput("");
    };

    const handleMoodPress = function (mood) {
      openChatWithAssistantMessage(mood.question);
    };

    const handleQuickHelpPress = function (item) {
      openChatWithAssistantMessage(item.response);
    };

    const appendSafetyMessage = function (userMessage) {
      setChatMessages(function (previous) {
        const nextMessages = previous.slice();
        if (userMessage && String(userMessage).trim()) {
          nextMessages.push({
            id: makeId("wellbeing_user", "safety"),
            sender: "user",
            text: String(userMessage).trim(),
            createdAt: new Date().toISOString(),
          });
        }
        nextMessages.push({
          id: makeId("wellbeing_ai", "safety"),
          sender: "ai",
          text: WELLBEING_SAFETY_MESSAGE,
          isSafety: true,
          createdAt: new Date().toISOString(),
        });
        return nextMessages;
      });
      setSafetyLocked(true);
      setChatVisible(true);
      setChatInput("");
    };

    const handleSendMessage = function () {
      const trimmed = chatInput ? String(chatInput).trim() : "";
      if (!trimmed || safetyLocked) return;

      if (containsWellbeingSafetyConcern(trimmed)) {
        appendSafetyMessage(trimmed);
        return;
      }

      const aiReply = buildWellbeingCompanionReply(trimmed);
      setChatMessages(function (previous) {
        return previous.concat([
          {
            id: makeId("wellbeing_user", "normal"),
            sender: "user",
            text: trimmed,
            createdAt: new Date().toISOString(),
          },
          {
            id: makeId("wellbeing_ai", "normal"),
            sender: "ai",
            text: aiReply,
            createdAt: new Date().toISOString(),
          },
        ]);
      });
      setChatInput("");
    };

    const clearChat = function () {
      setChatMessages([]);
      setChatInput("");
      setSafetyLocked(false);
      setChatVisible(false);
    };

    const acknowledgeSafety = function () {
      setChatMessages([]);
      setChatInput("");
      setSafetyLocked(false);
      setChatVisible(false);
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          keyboardShouldPersistTaps: "handled",
          contentContainerStyle: {
            padding: 20,
            paddingTop: 48 + (insets.top || 0),
            paddingBottom: 150 + (insets.bottom || 0),
          },
        },
        React.createElement(
          View,
          { style: styles.wellbeingHeaderBlock },
          React.createElement(
            Text,
            {
              style: [
                styles.wellbeingLargeTitle,
                { color: theme.colors.primary },
              ],
            },
            "Wellbeing",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.wellbeingSubtitle,
                { color: theme.colors.textSecondary },
              ],
            },
            "A calm space to express, reflect, and get support.",
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.wellbeingCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.wellbeingCardTopRow },
            React.createElement(
              View,
              {
                style: [
                  styles.wellbeingIconWrap,
                  { backgroundColor: theme.colors.lavender },
                ],
              },
              React.createElement(MaterialIcons, {
                name: "favorite-border",
                size: 24,
                color: theme.colors.accent,
              }),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.wellbeingCardTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              "How are you feeling today?",
            ),
          ),
          React.createElement(
            View,
            { style: styles.wellbeingMoodGrid },
            moodOptions.map(function (mood) {
              return React.createElement(
                TouchableOpacity,
                {
                  key: mood.id,
                  style: [
                    styles.wellbeingMoodButton,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    },
                  ],
                  activeOpacity: 0.84,
                  onPress: function () {
                    handleMoodPress(mood);
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.wellbeingMoodText,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  mood.label,
                ),
              );
            }),
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.wellbeingCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.wellbeingCardTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Quick Help",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.wellbeingSmallText,
                { color: theme.colors.textSecondary, marginBottom: 14 },
              ],
            },
            "Choose a quick support response when you need a calm starting point.",
          ),
          quickHelpOptions.map(function (item) {
            return React.createElement(
              TouchableOpacity,
              {
                key: item.id,
                style: [
                  styles.wellbeingQuickButton,
                  {
                    backgroundColor: theme.colors.lavender,
                    borderColor: theme.colors.border,
                  },
                ],
                activeOpacity: 0.84,
                onPress: function () {
                  handleQuickHelpPress(item);
                },
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.wellbeingQuickButtonText,
                    { color: theme.colors.primary },
                  ],
                },
                item.label,
              ),
              React.createElement(MaterialIcons, {
                name: "chevron-right",
                size: 22,
                color: theme.colors.accent,
              }),
            );
          }),
        ),
        chatVisible
          ? React.createElement(
              View,
              {
                style: [
                  styles.wellbeingCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                View,
                { style: styles.wellbeingChatHeaderRow },
                React.createElement(
                  View,
                  { style: { flex: 1, paddingRight: 12 } },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.wellbeingCardTitle,
                        { color: theme.colors.textPrimary },
                      ],
                    },
                    "AI Study Companion",
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.wellbeingSmallText,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "Supportive reflection only. No diagnosis.",
                  ),
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.wellbeingClearButton,
                      { borderColor: theme.colors.border },
                    ],
                    onPress: clearChat,
                  },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.wellbeingClearButtonText,
                        { color: theme.colors.error },
                      ],
                    },
                    "Clear Chat",
                  ),
                ),
              ),
              React.createElement(
                View,
                { style: styles.wellbeingChatList },
                chatMessages.map(function (message) {
                  const isUser = message.sender === "user";
                  return React.createElement(
                    View,
                    {
                      key: message.id,
                      style: [
                        styles.wellbeingBubble,
                        isUser
                          ? styles.wellbeingUserBubble
                          : styles.wellbeingAiBubble,
                        {
                          backgroundColor: message.isSafety
                            ? "#FEF2F2"
                            : isUser
                              ? theme.colors.primary
                              : theme.colors.background,
                          borderColor: message.isSafety
                            ? "#FCA5A5"
                            : theme.colors.border,
                        },
                      ],
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.wellbeingBubbleText,
                          {
                            color: message.isSafety
                              ? theme.colors.error
                              : isUser
                                ? "#FFFFFF"
                                : theme.colors.textPrimary,
                          },
                        ],
                      },
                      message.text,
                    ),
                  );
                }),
              ),
              safetyLocked
                ? React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.primaryButton,
                        {
                          backgroundColor: theme.colors.primary,
                          marginTop: 14,
                        },
                      ],
                      onPress: acknowledgeSafety,
                    },
                    React.createElement(MaterialIcons, {
                      name: "check-circle",
                      size: 20,
                      color: "#FFFFFF",
                    }),
                    React.createElement(
                      Text,
                      { style: styles.primaryButtonText },
                      "I understand",
                    ),
                  )
                : React.createElement(
                    View,
                    { style: styles.wellbeingInputRow },
                    React.createElement(TextInput, {
                      style: [
                        styles.wellbeingChatInput,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                          color: theme.colors.textPrimary,
                        },
                      ],
                      placeholder: "Tell me what you’re feeling...",
                      placeholderTextColor: theme.colors.textSecondary,
                      value: chatInput,
                      onChangeText: setChatInput,
                      multiline: true,
                    }),
                    React.createElement(
                      TouchableOpacity,
                      {
                        style: [
                          styles.wellbeingSendButton,
                          { backgroundColor: theme.colors.accent },
                        ],
                        onPress: handleSendMessage,
                      },
                      React.createElement(
                        Text,
                        { style: styles.wellbeingSendButtonText },
                        "Send",
                      ),
                    ),
                  ),
            )
          : null,
        React.createElement(
          View,
          {
            style: [
              styles.wellbeingNoticeCard,
              {
                backgroundColor: theme.colors.lavender,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(MaterialIcons, {
            name: "info-outline",
            size: 20,
            color: theme.colors.accent,
          }),
          React.createElement(
            Text,
            {
              style: [
                styles.wellbeingNoticeText,
                { color: theme.colors.primary },
              ],
            },
            "Objective 100 supports reflection and encouragement. It does not diagnose or replace professional help.",
          ),
        ),
      ),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "wellbeing",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const normalizeTutorChat = function (chat) {
    const now = new Date().toISOString();
    const rawMessages = Array.isArray(chat && chat.messages)
      ? chat.messages
      : [];
    return {
      id: chat && chat.id ? String(chat.id) : makeId("aiTutorChat", "fallback"),
      title: chat && chat.title ? String(chat.title) : "Untitled Chat",
      messages: rawMessages.map(function (message) {
        return {
          id:
            message && message.id
              ? String(message.id)
              : makeId("tutorMsg", "fallback"),
          role: message && message.role === "ai" ? "ai" : "user",
          text: message && message.text ? String(message.text) : "",
          imageUri:
            message && message.imageUri ? normalizeUri(message.imageUri) : "",
          createdAt: message && message.createdAt ? message.createdAt : now,
        };
      }),
      createdAt: chat && chat.createdAt ? chat.createdAt : now,
      updatedAt:
        chat && chat.updatedAt
          ? chat.updatedAt
          : chat && chat.createdAt
            ? chat.createdAt
            : now,
      optionalSubject:
        chat && chat.optionalSubject ? String(chat.optionalSubject) : "",
      optionalUploadedImages: Array.isArray(chat && chat.optionalUploadedImages)
        ? chat.optionalUploadedImages.map(normalizeUri).filter(Boolean)
        : [],
    };
  };

  const sortTutorChatsNewestFirst = function (a, b) {
    return (
      new Date((b && (b.updatedAt || b.createdAt)) || 0).getTime() -
      new Date((a && (a.updatedAt || a.createdAt)) || 0).getTime()
    );
  };

  const buildTutorChatTitle = function (questionText, hasImage) {
    const clean = String(questionText || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean && hasImage) return "Uploaded Question Help";
    if (!clean) return "New AI Tutor Chat";
    const withoutQuestionPrefix = clean.replace(
      /^(please\s+)?(help\s+me\s+)?(solve|explain|check)\s+/i,
      "",
    );
    return withoutQuestionPrefix.length > 42
      ? withoutQuestionPrefix.slice(0, 42).trim() + "..."
      : withoutQuestionPrefix;
  };

  const inferTutorSubjectFromText = function (questionText) {
    const text = String(questionText || "").toLowerCase();
    if (
      /force|momentum|velocity|acceleration|current|voltage|resistance|wave|energy/.test(
        text,
      )
    )
      return "Physics";
    if (
      /mole|acid|base|alkali|enthalpy|organic|bond|equilibrium|oxidation|hydroxide/.test(
        text,
      )
    )
      return "Chemistry";
    if (
      /differentiate|integrate|matrix|vector|probability|gradient|equation|algebra|trigonometry/.test(
        text,
      )
    )
      return "Mathematics";
    if (/essay|argument|summary|grammar|language|literature/.test(text))
      return "English";
    if (
      /cell|enzyme|photosynthesis|respiration|genetic|protein|biology/.test(
        text,
      )
    )
      return "Biology";
    return "academic";
  };

  // Local demo tutor only: this does not perform real OCR or real image understanding.
  // Later, replace this helper with a secure backend call to OpenAI/Gemini after sending text/OCR/image data to your server.
  const buildLocalTutorReply = function (
    questionText,
    subjectName,
    hasImage,
    previousMessages,
  ) {
    const text = String(questionText || "").trim();
    const lower = text.toLowerCase();
    const subject = subjectName || inferTutorSubjectFromText(text);
    const previousCount = Array.isArray(previousMessages)
      ? previousMessages.length
      : 0;

    if (
      lower.indexOf("live test") >= 0 ||
      lower.indexOf("during exam") >= 0 ||
      lower.indexOf("cheat") >= 0 ||
      lower.indexOf("give me answers only") >= 0
    ) {
      return "I can’t help with cheating in a live test or exam.\n\nI can still help you revise the same topic, practise a similar question, or check your working step by step after the exam.";
    }

    if (hasImage && text.length === 0) {
      return "I received your question image.\n\nThis local demo can attach the image, but it cannot truly read the image yet because OCR or a real AI vision backend is not connected.\n\nPlease type the question text, or connect a backend OCR/AI service later, and I’ll guide you step by step.";
    }

    if (hasImage && text.length > 0) {
      return (
        "I received the image and your typed question.\n\nLet’s break it down using the text you provided, because this local demo does not claim to read the image directly.\n\n" +
        buildLocalTutorReply(text, subject, false, previousMessages)
      );
    }

    if (!text) {
      return "Ask a homework, exam, or topic question and I’ll guide you.\n\nYou can also upload or take a photo, but for this demo please type the key question text so the answer is more accurate.";
    }

    if (lower.indexOf("hint") >= 0) {
      return "Hint: start by identifying exactly what the question asks.\n\nList the given information, choose the relevant concept, then attempt only the first step.\n\nAfter that, send your working and I’ll check it without jumping straight to the final answer.";
    }

    if (
      lower.indexOf("check") >= 0 ||
      lower.indexOf("my answer") >= 0 ||
      lower.indexOf("is this correct") >= 0
    ) {
      return "Let’s check it carefully.\n\nCompare your method with four things: the concept used, the substitution or reasoning, the units or exam keywords, and whether your final answer matches the question command word.\n\nSend your working if you want a more exact check.";
    }

    if (subject === "Physics") {
      return "Let’s break it down as a Physics question.\n\n1. Identify the quantity asked for and write the known values with units.\n2. Choose the formula that links the known values to the unknown.\n3. Substitute carefully, keep units throughout, then check whether the answer is sensible.\n\nThis is a local demo response, so I can guide the method but I cannot guarantee the final answer without seeing your full working.";
    }

    if (subject === "Chemistry") {
      return "Let’s break it down as a Chemistry question.\n\n1. Identify the key topic, such as ions, bonding, organic chemistry, equilibrium, or moles.\n2. Use correct exam keywords: observations, equations, state symbols, conditions, or calculation steps where needed.\n3. If it involves a test or reaction, state the reagent, observation, and conclusion clearly.\n\nType the exact question or your answer and I’ll help refine it for marks.";
    }

    if (subject === "Mathematics") {
      return "Let’s break it down as a Mathematics question.\n\n1. Write the given information and what must be found.\n2. Choose the method: algebra, differentiation, integration, vectors, probability, or graph reasoning.\n3. Show each line of working and check the final value by substitution or estimation.\n\nSend the full expression or your working if you want a more precise solution.";
    }

    if (subject === "Biology") {
      return "Let’s break it down as a Biology question.\n\n1. Define the key process or term first.\n2. Explain the sequence clearly using scientific keywords.\n3. Add marking points such as cause, effect, comparison, and final conclusion.\n\nIf this is an exam question, type the mark value so I can guide the answer length.";
    }

    if (subject === "English") {
      return "Let’s break it down as an English or writing question.\n\n1. Identify the task: explain, analyse, argue, summarise, or evaluate.\n2. Plan a clear point, evidence, explanation, and link.\n3. Keep the tone suitable for the audience and check grammar after the ideas are complete.\n\nSend your draft if you want me to improve it.";
    }

    return (
      "Let’s break it down.\n\n1. Identify the subject and topic.\n2. Write what is given and what the question asks for.\n3. Choose the correct method, then solve or explain step by step.\n\n" +
      (previousCount > 0
        ? "I’ll continue from this chat history where possible. "
        : "") +
      "For a more accurate response, type the full question and any answer you have tried."
    );
  };

  const ExploreScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();

    const exploreItems = [
      {
        id: "extraCurricular",
        title: "Extracurricular",
        description:
          "Discover competitions, workshops and activities beyond the classroom.",
        buttonText: "View Activities",
        icon: "emoji-events",
        targetScreen: "exploreExtraCurricular",
      },
      {
        id: "classroom",
        title: "Classroom",
        description: "Join Classrooms made by your teacher",
        icon: "school",
        targetScreen: "exploreClassroom",
      },
      {
        id: "askCommunity",
        title: "Ask the community",
        description: "Connect or ask help from the community",
        icon: "forum",
        targetScreen: "exploreChat",
      },
      {
        id: "askAiHelp",
        title: "Ask AI Tutor",
        description:
          "Type, snap or upload a question and get step-by-step academic guidance.",
        icon: "smart-toy",
        targetScreen: "exploreAskAiHelp",
      },
    ];

    const renderExploreCard = function (item) {
      return React.createElement(
        TouchableOpacity,
        {
          key: item.id,
          style: [
            styles.exploreFileCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
          activeOpacity: 0.84,
          onPress: function () {
            if (props.onOpenExplorePage)
              props.onOpenExplorePage(item.targetScreen);
          },
        },
        React.createElement(
          View,
          {
            style: [
              styles.exploreFileIconWrap,
              { backgroundColor: theme.colors.lavender },
            ],
          },
          React.createElement(MaterialIcons, {
            name: item.icon,
            size: 28,
            color: theme.colors.accent,
          }),
        ),
        React.createElement(
          View,
          { style: { flex: 1, paddingRight: 12 } },
          React.createElement(
            Text,
            {
              style: [
                styles.exploreFileTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            item.title,
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.exploreFileDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            item.description,
          ),
          item.buttonText
            ? React.createElement(
                Text,
                {
                  style: [
                    styles.exploreFileButtonText,
                    { color: theme.colors.accent },
                  ],
                },
                item.buttonText,
              )
            : null,
        ),
        React.createElement(MaterialIcons, {
          name: "chevron-right",
          size: 24,
          color: theme.colors.textSecondary,
        }),
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          contentContainerStyle: {
            padding: 20,
            paddingTop: 48 + (insets.top || 0),
            paddingBottom: 140 + (insets.bottom || 0),
          },
        },
        React.createElement(
          View,
          { style: styles.exploreHeaderBlock },
          React.createElement(
            Text,
            {
              style: [
                styles.exploreLargeTitle,
                { color: theme.colors.primary },
              ],
            },
            "Explore",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.exploreSubtitle,
                { color: theme.colors.textSecondary },
              ],
            },
            "Discover learning spaces beyond your quiz practice.",
          ),
        ),
        exploreItems.map(renderExploreCard),
      ),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "explore",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const ExtracurricularScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const [savedOpportunity, setSavedOpportunity] = useState(false);

    const TELEGRAM_OPPORTUNITY_URL = "https://t.me/+5m2SoFZNxOcxNThl";

    const openTelegramOpportunity = function () {
      const openLink = function () {
        if (Platform.OS === "web") {
          try {
            window.open(TELEGRAM_OPPORTUNITY_URL, "_blank");
          } catch (e) {
            showMessage(
              "Unable to Open Link",
              "Please check your internet connection or open the Telegram channel manually.",
            );
          }
          return;
        }

        try {
          Linking.openURL(TELEGRAM_OPPORTUNITY_URL).catch(function () {
            showMessage(
              "Unable to Open Link",
              "Please check your internet connection or open the Telegram channel manually.",
            );
          });
        } catch (e) {
          showMessage(
            "Unable to Open Link",
            "Please check your internet connection or open the Telegram channel manually.",
          );
        }
      };

      if (Platform.OS === "web") {
        const confirmed = window.confirm(
          "Open External Link?\n\nYou are opening the Objective 100 Telegram opportunities channel. Please verify the full details before applying.",
        );
        if (confirmed) openLink();
        return;
      }

      Alert.alert(
        "Open External Link?",
        "You are opening the Objective 100 Telegram opportunities channel. Please verify the full details before applying.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Telegram", onPress: openLink },
        ],
      );
    };

    const toggleSavedOpportunity = function () {
      setSavedOpportunity(function (previous) {
        const nextValue = !previous;
        showMessage(
          nextValue ? "Saved" : "Removed",
          nextValue
            ? "Saved to your opportunities"
            : "Removed from saved opportunities",
        );
        return nextValue;
      });
    };

    const Badge = function (badgeProps) {
      return React.createElement(
        View,
        {
          style: [
            styles.extracurricularBadge,
            {
              backgroundColor: badgeProps.backgroundColor,
              borderColor: badgeProps.borderColor || badgeProps.backgroundColor,
            },
          ],
        },
        React.createElement(
          Text,
          {
            style: [
              styles.extracurricularBadgeText,
              { color: badgeProps.textColor },
            ],
          },
          badgeProps.label,
        ),
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: "Extracurricular",
        showBack: true,
        onBack: props.onBack,
        showNext: false,
      }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          contentContainerStyle: {
            padding: 20,
            paddingBottom: 44 + (insets.bottom || 0),
          },
          showsVerticalScrollIndicator: false,
        },
        React.createElement(
          View,
          { style: styles.exploreHeaderBlock },
          React.createElement(
            Text,
            {
              style: [
                styles.exploreLargeTitle,
                { color: theme.colors.primary },
              ],
            },
            "Extracurricular",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.exploreSubtitle,
                { color: theme.colors.textSecondary },
              ],
            },
            "Discover new curricular activities and opportunities beyond the classroom.",
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.extracurricularIntroCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            {
              style: [
                styles.extracurricularIntroIcon,
                { backgroundColor: theme.colors.lavender },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "workspace-premium",
              size: 26,
              color: theme.colors.accent,
            }),
          ),
          React.createElement(
            View,
            { style: { flex: 1 } },
            React.createElement(
              Text,
              {
                style: [
                  styles.extracurricularIntroTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              "Build your holistic profile",
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.extracurricularIntroText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Explore competitions, workshops and activities that can strengthen your skills, confidence and university applications.",
            ),
          ),
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.extracurricularOpportunityCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
            activeOpacity: 0.86,
            onPress: openTelegramOpportunity,
          },
          React.createElement(
            View,
            { style: styles.extracurricularOpportunityTopRow },
            React.createElement(Badge, {
              label: "Competition",
              backgroundColor: theme.colors.lavender,
              borderColor: theme.colors.lavender,
              textColor: theme.colors.accent,
            }),
            React.createElement(Badge, {
              label: "Open",
              backgroundColor: "#DCFCE7",
              borderColor: "#BBF7D0",
              textColor: theme.colors.success,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.extracurricularOpportunityTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Bett Asia School Challenge 2026",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.extracurricularOpportunityDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "A student competition opportunity shared through the Objective 100 extracurricular channel.",
          ),
          React.createElement(
            View,
            { style: styles.extracurricularInfoRow },
            React.createElement(MaterialIcons, {
              name: "event",
              size: 18,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.extracurricularInfoText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Deadline: Coming Soon",
            ),
          ),
          React.createElement(
            View,
            { style: styles.extracurricularInfoRow },
            React.createElement(MaterialIcons, {
              name: "campaign",
              size: 18,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.extracurricularInfoText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Source: Objective 100 Opportunities",
            ),
          ),
          React.createElement(
            View,
            { style: styles.extracurricularCardBottomRow },
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.extracurricularSaveButton,
                  {
                    backgroundColor: savedOpportunity
                      ? theme.colors.lavender
                      : theme.colors.background,
                    borderColor: savedOpportunity
                      ? theme.colors.accent
                      : theme.colors.border,
                  },
                ],
                activeOpacity: 0.82,
                onPress: function (event) {
                  if (event && event.stopPropagation) event.stopPropagation();
                  toggleSavedOpportunity();
                },
              },
              React.createElement(MaterialIcons, {
                name: savedOpportunity ? "bookmark" : "bookmark-border",
                size: 22,
                color: savedOpportunity
                  ? theme.colors.accent
                  : theme.colors.textSecondary,
              }),
              React.createElement(
                Text,
                {
                  style: [
                    styles.extracurricularSaveText,
                    {
                      color: savedOpportunity
                        ? theme.colors.accent
                        : theme.colors.textSecondary,
                    },
                  ],
                },
                savedOpportunity ? "Saved" : "Save",
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.extracurricularTelegramButton,
                  { backgroundColor: theme.colors.primary },
                ],
                activeOpacity: 0.84,
                onPress: function (event) {
                  if (event && event.stopPropagation) event.stopPropagation();
                  openTelegramOpportunity();
                },
              },
              React.createElement(MaterialIcons, {
                name: "open-in-new",
                size: 20,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.extracurricularTelegramButtonText },
                "Open Telegram",
              ),
            ),
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.extracurricularFutureCard,
              {
                backgroundColor: theme.colors.lavender,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.extracurricularFutureHeader },
            React.createElement(MaterialIcons, {
              name: "auto-awesome",
              size: 22,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.extracurricularFutureTitle,
                  { color: theme.colors.primary },
                ],
              },
              "Future AI Upgrade",
            ),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.extracurricularFutureText,
                { color: theme.colors.textSecondary },
              ],
            },
            "In the future, Objective 100 can use AI to summarise opportunities, detect deadlines, categorise activities and recommend suitable programmes based on each student’s goals.",
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.extracurricularSafetyNote,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(MaterialIcons, {
            name: "verified-user",
            size: 18,
            color: theme.colors.textSecondary,
          }),
          React.createElement(
            Text,
            {
              style: [
                styles.extracurricularSafetyText,
                { color: theme.colors.textSecondary },
              ],
            },
            "Objective 100 shares curated opportunity links for student discovery. Always verify details from the original source before applying.",
          ),
        ),
      ),
    );
  };

  const AskAITutorScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const camera = useCamera();
    const takePhoto = camera.takePhoto;
    const pickImage = camera.pickImage;

    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");
    const { data: chatsData, refetch: refetchChats } = useQuery("aiTutorChats");
    const { mutate: insertChat } = useMutation("aiTutorChats", "insert");
    const { mutate: updateChat } = useMutation("aiTutorChats", "update");
    const { mutate: deleteChatMutation } = useMutation(
      "aiTutorChats",
      "delete",
    );

    const folders = buildFolderListFromData(foldersData || [], []);
    const storedChats = Array.isArray(chatsData) ? chatsData : [];

    const [localChats, setLocalChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [draftQuestion, setDraftQuestion] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [menuChat, setMenuChat] = useState(null);
    const [renameChat, setRenameChat] = useState(null);
    const [renameText, setRenameText] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isSavingTutorChat, setIsSavingTutorChat] = useState(false);

    useEffect(function () {
      if (refetchFolders) refetchFolders();
      if (refetchChats) refetchChats();
    }, []);

    useEffect(
      function () {
        const safeChats = storedChats
          .map(function (chat) {
            return normalizeTutorChat(chat);
          })
          .sort(sortTutorChatsNewestFirst);
        setLocalChats(safeChats);
      },
      [storedChats.length],
    );

    const activeChat =
      localChats.find(function (chat) {
        return chat.id === activeChatId;
      }) || null;
    const selectedSubject =
      folders.find(function (folder) {
        return folder.id === selectedSubjectId;
      }) || null;

    const saveTutorChat = function (chat, preferUpdate) {
      const safeChat = normalizeTutorChat(chat);
      setIsSavingTutorChat(true);
      const finish = function () {
        setIsSavingTutorChat(false);
        if (refetchChats) refetchChats();
      };
      const failSilently = function () {
        setIsSavingTutorChat(false);
      };
      const firstAction = preferUpdate ? updateChat : insertChat;
      const fallbackAction = preferUpdate ? insertChat : updateChat;
      firstAction(safeChat)
        .then(finish)
        .catch(function () {
          fallbackAction(safeChat).then(finish).catch(failSilently);
        });
    };

    const replaceChatInLocalState = function (chat) {
      const safeChat = normalizeTutorChat(chat);
      setLocalChats(function (previous) {
        const exists = previous.some(function (item) {
          return item.id === safeChat.id;
        });
        const next = exists
          ? previous.map(function (item) {
              return item.id === safeChat.id ? safeChat : item;
            })
          : [safeChat].concat(previous);
        return next.sort(sortTutorChatsNewestFirst);
      });
    };

    const startNewChat = function () {
      setActiveChatId(null);
      setDraftQuestion("");
      setSelectedSubjectId("");
      setMenuChat(null);
    };

    const openChat = function (chat) {
      setActiveChatId(chat.id);
      setDraftQuestion("");
      setSelectedSubjectId(chat.optionalSubject || "");
      setMenuChat(null);
    };

    const buildAiTutorResponse = function (
      questionText,
      subjectName,
      hasImage,
      previousMessages,
    ) {
      return buildLocalTutorReply(
        questionText,
        subjectName,
        hasImage,
        previousMessages,
      );
    };

    const createOrUpdateChatWithUserMessage = function (text, imageUri) {
      const cleanText = String(text || "").trim();
      const safeImageUri = normalizeUri(imageUri || "");
      if (!cleanText && !safeImageUri) {
        showMessage(
          "Question Needed",
          "Type a question, take a photo or upload a question image first.",
        );
        return;
      }
      const now = new Date().toISOString();
      const existingChat = activeChat ? normalizeTutorChat(activeChat) : null;
      const subjectName = selectedSubject ? selectedSubject.name : "";
      const userMessage = {
        id: makeId("tutorUser", cleanText ? cleanText.slice(0, 12) : "image"),
        role: "user",
        text: cleanText || "Uploaded question image",
        imageUri: safeImageUri,
        createdAt: now,
      };
      const aiMessage = {
        id: makeId("tutorAI", cleanText ? cleanText.slice(0, 12) : "image"),
        role: "ai",
        text: buildAiTutorResponse(
          cleanText,
          subjectName,
          !!safeImageUri,
          existingChat ? existingChat.messages : [],
        ),
        imageUri: "",
        createdAt: new Date().toISOString(),
      };
      const optionalImages =
        existingChat && Array.isArray(existingChat.optionalUploadedImages)
          ? existingChat.optionalUploadedImages.slice()
          : [];
      if (safeImageUri && optionalImages.indexOf(safeImageUri) < 0)
        optionalImages.push(safeImageUri);
      const nextChat = existingChat
        ? Object.assign({}, existingChat, {
            messages: existingChat.messages.concat([userMessage, aiMessage]),
            optionalSubject:
              selectedSubjectId || existingChat.optionalSubject || "",
            optionalUploadedImages: optionalImages,
            updatedAt: now,
          })
        : {
            id: makeId(
              "aiTutorChat",
              cleanText ? cleanText.slice(0, 12) : "image",
            ),
            title: buildTutorChatTitle(cleanText, !!safeImageUri),
            messages: [userMessage, aiMessage],
            createdAt: now,
            updatedAt: now,
            optionalSubject: selectedSubjectId || "",
            optionalUploadedImages: optionalImages,
          };
      replaceChatInLocalState(nextChat);
      setActiveChatId(nextChat.id);
      setDraftQuestion("");
      saveTutorChat(nextChat, !!existingChat);
    };

    const handleSubmitTypedQuestion = function () {
      createOrUpdateChatWithUserMessage(draftQuestion, "");
    };

    const handleTakeTutorPhoto = function () {
      takePhoto({ quality: 0.86 })
        .then(function (result) {
          if (result && result.error) {
            showMessage("Camera Error", result.error);
            return;
          }
          if (result && result.cancelled) return;
          const uris = getImageUrisFromPickerResult(result);
          if (!uris || uris.length === 0) {
            showMessage("Camera Error", "No photo was returned.");
            return;
          }
          createOrUpdateChatWithUserMessage(
            draftQuestion || "Please help me solve this question.",
            uris[0],
          );
        })
        .catch(function (error) {
          showMessage(
            "Camera Error",
            error && error.message ? error.message : "Unable to take photo.",
          );
        });
    };

    const handleUploadTutorQuestion = function () {
      pickImage({
        allowsEditing: false,
        allowsMultipleSelection: false,
        selectionLimit: 1,
        quality: 0.9,
      })
        .then(function (result) {
          if (result && result.error) {
            showMessage("Upload Error", result.error);
            return;
          }
          if (result && result.cancelled) return;
          const uris = getImageUrisFromPickerResult(result);
          if (!uris || uris.length === 0) {
            showMessage("Upload Error", "No question image was selected.");
            return;
          }
          createOrUpdateChatWithUserMessage(
            draftQuestion || "Please help me solve this uploaded question.",
            uris[0],
          );
        })
        .catch(function (error) {
          showMessage(
            "Upload Error",
            error && error.message
              ? error.message
              : "Unable to upload the question image.",
          );
        });
    };

    const clearCurrentTutorChat = function () {
      if (!activeChat) return;
      confirmAction(
        "Clear Current Chat?",
        "This will remove messages from the current conversation only. It will not delete other saved chats.",
        function () {
          const now = new Date().toISOString();
          const nextChat = Object.assign({}, normalizeTutorChat(activeChat), {
            messages: [],
            optionalUploadedImages: [],
            updatedAt: now,
          });
          replaceChatInLocalState(nextChat);
          saveTutorChat(nextChat, true);
        },
      );
    };

    const openRenameModal = function (chat) {
      setMenuChat(null);
      setRenameChat(chat);
      setRenameText(chat.title || "");
    };

    const saveRename = function () {
      if (!renameChat) return;
      const trimmed = String(renameText || "").trim();
      if (!trimmed) {
        showMessage("Missing Name", "Enter a new chat name first.");
        return;
      }
      const nextChat = Object.assign({}, normalizeTutorChat(renameChat), {
        title: trimmed,
        updatedAt: new Date().toISOString(),
      });
      replaceChatInLocalState(nextChat);
      setRenameChat(null);
      setRenameText("");
      saveTutorChat(nextChat, true);
    };

    const confirmDeleteChat = function () {
      if (!deleteTarget) return;
      const target = deleteTarget;
      setLocalChats(function (previous) {
        return previous.filter(function (chat) {
          return chat.id !== target.id;
        });
      });
      if (activeChatId === target.id) setActiveChatId(null);
      setDeleteTarget(null);
      setMenuChat(null);
      deleteChatMutation({ id: target.id })
        .then(function () {
          if (refetchChats) refetchChats();
        })
        .catch(function () {});
    };

    const renderSubjectSelector = function () {
      return React.createElement(
        ScrollView,
        {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          contentContainerStyle: styles.aiTutorSubjectScroll,
        },
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.aiTutorSubjectChip,
              {
                backgroundColor: selectedSubjectId
                  ? theme.colors.card
                  : theme.colors.primary,
                borderColor: selectedSubjectId
                  ? theme.colors.border
                  : theme.colors.primary,
              },
            ],
            activeOpacity: 0.82,
            onPress: function () {
              setSelectedSubjectId("");
            },
          },
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorSubjectChipText,
                {
                  color: selectedSubjectId
                    ? theme.colors.textSecondary
                    : "#FFFFFF",
                },
              ],
            },
            "Auto subject",
          ),
        ),
        folders.map(function (folder) {
          const active = selectedSubjectId === folder.id;
          return React.createElement(
            TouchableOpacity,
            {
              key: folder.id,
              style: [
                styles.aiTutorSubjectChip,
                {
                  backgroundColor: active
                    ? theme.colors.accent
                    : theme.colors.card,
                  borderColor: active
                    ? theme.colors.accent
                    : theme.colors.border,
                },
              ],
              activeOpacity: 0.82,
              onPress: function () {
                setSelectedSubjectId(active ? "" : folder.id);
              },
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.aiTutorSubjectChipText,
                  { color: active ? "#FFFFFF" : theme.colors.textSecondary },
                ],
              },
              folder.name,
            ),
          );
        }),
      );
    };

    const renderMessage = function (message) {
      const isUser = message.role === "user";
      return React.createElement(
        View,
        {
          key: message.id,
          style: [
            styles.aiTutorMessageBubble,
            isUser ? styles.aiTutorUserBubble : styles.aiTutorAiBubble,
            {
              backgroundColor: isUser
                ? theme.colors.primary
                : theme.colors.card,
              borderColor: isUser ? theme.colors.primary : theme.colors.border,
            },
          ],
        },
        message.imageUri
          ? React.createElement(Image, {
              source: { uri: message.imageUri },
              style: styles.aiTutorMessageImage,
              resizeMode: "cover",
            })
          : null,
        React.createElement(
          Text,
          {
            style: [
              styles.aiTutorMessageText,
              { color: isUser ? "#FFFFFF" : theme.colors.textPrimary },
            ],
          },
          message.text || "",
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.aiTutorMessageTime,
              {
                color: isUser
                  ? "rgba(255,255,255,0.72)"
                  : theme.colors.textSecondary,
              },
            ],
          },
          formatDateTime(message.createdAt),
        ),
      );
    };

    const renderChatRow = function (chat) {
      const latest =
        chat.messages && chat.messages.length
          ? chat.messages[chat.messages.length - 1]
          : null;
      const first =
        chat.messages && chat.messages.length ? chat.messages[0] : null;
      const preview =
        latest && latest.text
          ? latest.text
          : first && first.text
            ? first.text
            : "No messages yet";
      return React.createElement(
        TouchableOpacity,
        {
          key: chat.id,
          style: [
            styles.aiTutorChatRow,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
          activeOpacity: 0.84,
          onPress: function () {
            openChat(chat);
          },
        },
        React.createElement(
          View,
          {
            style: [
              styles.aiTutorChatIcon,
              { backgroundColor: theme.colors.lavender },
            ],
          },
          React.createElement(MaterialIcons, {
            name: "chat-bubble-outline",
            size: 22,
            color: theme.colors.accent,
          }),
        ),
        React.createElement(
          View,
          { style: { flex: 1, paddingRight: 8 } },
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorChatTitle,
                { color: theme.colors.textPrimary },
              ],
              numberOfLines: 1,
            },
            chat.title || "Untitled Chat",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorChatPreview,
                { color: theme.colors.textSecondary },
              ],
              numberOfLines: 2,
            },
            preview,
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorChatDate,
                { color: theme.colors.textSecondary },
              ],
            },
            formatDateTime(chat.updatedAt || chat.createdAt),
          ),
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: styles.aiTutorThreeDotButton,
            activeOpacity: 0.78,
            onPress: function (event) {
              if (event && event.stopPropagation) event.stopPropagation();
              setMenuChat(chat);
            },
          },
          React.createElement(MaterialIcons, {
            name: "more-vert",
            size: 24,
            color: theme.colors.textSecondary,
          }),
        ),
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: "Ask AI Tutor",
        showBack: true,
        onBack: props.onBack,
        showNext: false,
      }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: theme.colors.background },
          contentContainerStyle: {
            padding: 20,
            paddingBottom: 44 + (insets.bottom || 0),
          },
          showsVerticalScrollIndicator: false,
        },
        React.createElement(
          View,
          {
            style: [
              styles.aiTutorHeroCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            {
              style: [
                styles.aiTutorHeroIcon,
                { backgroundColor: theme.colors.lavender },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "smart-toy",
              size: 30,
              color: theme.colors.accent,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [styles.aiTutorHeroTitle, { color: theme.colors.primary }],
            },
            "Ask AI Tutor",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorHeroText,
                { color: theme.colors.textSecondary },
              ],
            },
            "Get hints, step-by-step explanations, answer checking and exam technique support. Subject selection is optional.",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.aiTutorHelperText,
                { color: theme.colors.textSecondary },
              ],
            },
            "Subject selection is optional. You can type, upload, or take a photo of a question.",
          ),
          renderSubjectSelector(),
          React.createElement(
            View,
            {
              style: [
                styles.aiTutorInputCard,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "search",
              size: 22,
              color: theme.colors.textSecondary,
            }),
            React.createElement(TextInput, {
              style: [
                styles.aiTutorTopInput,
                { color: theme.colors.textPrimary },
              ],
              placeholder: "Ask a homework, exam, or topic question...",
              placeholderTextColor: disabledColor,
              value: draftQuestion,
              onChangeText: setDraftQuestion,
              multiline: true,
            }),
          ),
          React.createElement(
            View,
            { style: styles.aiTutorActionRow },
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.aiTutorActionButton,
                  { backgroundColor: theme.colors.primary },
                ],
                activeOpacity: 0.84,
                onPress: startNewChat,
              },
              React.createElement(MaterialIcons, {
                name: "add",
                size: 18,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.aiTutorActionButtonText },
                "New Chat",
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.aiTutorActionButton,
                  { backgroundColor: theme.colors.accent },
                ],
                activeOpacity: 0.84,
                onPress: handleTakeTutorPhoto,
              },
              React.createElement(MaterialIcons, {
                name: "photo-camera",
                size: 18,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.aiTutorActionButtonText },
                "Take Photo",
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: [
                  styles.aiTutorActionButton,
                  { backgroundColor: theme.colors.purpleSoft },
                ],
                activeOpacity: 0.84,
                onPress: handleUploadTutorQuestion,
              },
              React.createElement(MaterialIcons, {
                name: "upload-file",
                size: 18,
                color: "#FFFFFF",
              }),
              React.createElement(
                Text,
                { style: styles.aiTutorActionButtonText },
                "Upload Question",
              ),
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.aiTutorAskButton,
                { backgroundColor: theme.colors.primary },
              ],
              activeOpacity: 0.86,
              onPress: handleSubmitTypedQuestion,
            },
            React.createElement(MaterialIcons, {
              name: "send",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.aiTutorAskButtonText },
              "Send / Ask",
            ),
          ),
        ),
        activeChat
          ? React.createElement(
              View,
              {
                style: [
                  styles.aiTutorActiveChatCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                View,
                { style: styles.aiTutorActiveHeader },
                React.createElement(
                  View,
                  { style: { flex: 1, paddingRight: 10 } },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorSectionTitle,
                        { color: theme.colors.primary },
                      ],
                      numberOfLines: 1,
                    },
                    activeChat.title || "Current Chat",
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorActiveMeta,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    selectedSubject ? selectedSubject.name : "Auto subject",
                  ),
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.aiTutorClearButton,
                      {
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.background,
                      },
                    ],
                    activeOpacity: 0.82,
                    onPress: clearCurrentTutorChat,
                  },
                  React.createElement(MaterialIcons, {
                    name: "cleaning-services",
                    size: 16,
                    color: theme.colors.error,
                  }),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorClearButtonText,
                        { color: theme.colors.error },
                      ],
                    },
                    "Clear Chat",
                  ),
                ),
              ),
              (activeChat.messages || []).length === 0
                ? React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorEmptyText,
                        { color: theme.colors.textSecondary },
                      ],
                    },
                    "This chat is cleared. Type a new question to continue in the same chat.",
                  )
                : (activeChat.messages || []).map(renderMessage),
            )
          : React.createElement(
              View,
              {
                style: [
                  styles.aiTutorEmptyCard,
                  {
                    backgroundColor: theme.colors.lavender,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(MaterialIcons, {
                name: "auto-awesome",
                size: 24,
                color: theme.colors.accent,
              }),
              React.createElement(
                Text,
                {
                  style: [
                    styles.aiTutorEmptyTitle,
                    { color: theme.colors.primary },
                  ],
                },
                "Start with any academic question",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.aiTutorEmptyText,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "You can type, take a photo or upload an image. If no subject is selected, the tutor will infer it automatically.",
              ),
            ),
        React.createElement(
          Text,
          {
            style: [
              styles.aiTutorSectionTitle,
              { color: theme.colors.primary },
            ],
          },
          "Chat History",
        ),
        localChats.length === 0
          ? React.createElement(
              View,
              {
                style: [
                  styles.aiTutorEmptyHistory,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.aiTutorEmptyText,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "No saved chats yet. Ask your first question to create one.",
              ),
            )
          : localChats.map(renderChatRow),
        isSavingTutorChat
          ? React.createElement(
              Text,
              {
                style: [
                  styles.aiTutorSavingText,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Saving chat...",
            )
          : null,
      ),
      menuChat
        ? React.createElement(
            Modal,
            {
              visible: !!menuChat,
              transparent: true,
              animationType: "fade",
              onRequestClose: function () {
                setMenuChat(null);
              },
            },
            React.createElement(
              TouchableOpacity,
              {
                style: styles.modalOverlay,
                activeOpacity: 1,
                onPress: function () {
                  setMenuChat(null);
                },
              },
              React.createElement(
                View,
                {
                  style: [
                    styles.aiTutorMenuCard,
                    { backgroundColor: theme.colors.card },
                  ],
                },
                React.createElement(
                  TouchableOpacity,
                  {
                    style: styles.aiTutorMenuItem,
                    onPress: function () {
                      openRenameModal(menuChat);
                    },
                  },
                  React.createElement(MaterialIcons, {
                    name: "drive-file-rename-outline",
                    size: 22,
                    color: theme.colors.primary,
                  }),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorMenuText,
                        { color: theme.colors.textPrimary },
                      ],
                    },
                    "Rename",
                  ),
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: styles.aiTutorMenuItem,
                    onPress: function () {
                      setDeleteTarget(menuChat);
                      setMenuChat(null);
                    },
                  },
                  React.createElement(MaterialIcons, {
                    name: "delete-outline",
                    size: 22,
                    color: theme.colors.error,
                  }),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.aiTutorMenuText,
                        { color: theme.colors.error },
                      ],
                    },
                    "Delete",
                  ),
                ),
              ),
            ),
          )
        : null,
      renameChat
        ? React.createElement(
            Modal,
            {
              visible: !!renameChat,
              transparent: true,
              animationType: "fade",
              onRequestClose: function () {
                setRenameChat(null);
              },
            },
            React.createElement(
              View,
              { style: styles.modalOverlay },
              React.createElement(
                View,
                {
                  style: [
                    styles.aiTutorModalCard,
                    { backgroundColor: theme.colors.card },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.aiTutorModalTitle,
                      { color: theme.colors.primary },
                    ],
                  },
                  "Rename Chat",
                ),
                React.createElement(TextInput, {
                  style: [
                    styles.aiTutorRenameInput,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.textPrimary,
                    },
                  ],
                  placeholder: "Enter new chat name",
                  placeholderTextColor: disabledColor,
                  value: renameText,
                  onChangeText: setRenameText,
                }),
                React.createElement(
                  View,
                  { style: styles.aiTutorModalButtonRow },
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.aiTutorModalButton,
                        { backgroundColor: theme.colors.background },
                      ],
                      onPress: function () {
                        setRenameChat(null);
                      },
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.aiTutorModalButtonText,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      "Cancel",
                    ),
                  ),
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.aiTutorModalButton,
                        { backgroundColor: theme.colors.primary },
                      ],
                      onPress: saveRename,
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.aiTutorModalButtonText,
                          { color: "#FFFFFF" },
                        ],
                      },
                      "Save",
                    ),
                  ),
                ),
              ),
            ),
          )
        : null,
      deleteTarget
        ? React.createElement(
            Modal,
            {
              visible: !!deleteTarget,
              transparent: true,
              animationType: "fade",
              onRequestClose: function () {
                setDeleteTarget(null);
              },
            },
            React.createElement(
              View,
              { style: styles.modalOverlay },
              React.createElement(
                View,
                {
                  style: [
                    styles.aiTutorModalCard,
                    { backgroundColor: theme.colors.card },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.aiTutorModalTitle,
                      { color: theme.colors.primary },
                    ],
                  },
                  "Delete this chat?",
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.aiTutorModalMessage,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "This chat will be permanently removed.",
                ),
                React.createElement(
                  View,
                  { style: styles.aiTutorModalButtonRow },
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.aiTutorModalButton,
                        { backgroundColor: theme.colors.background },
                      ],
                      onPress: function () {
                        setDeleteTarget(null);
                      },
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.aiTutorModalButtonText,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      "Cancel",
                    ),
                  ),
                  React.createElement(
                    TouchableOpacity,
                    {
                      style: [
                        styles.aiTutorModalButton,
                        { backgroundColor: theme.colors.error },
                      ],
                      onPress: confirmDeleteChat,
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.aiTutorModalButtonText,
                          { color: "#FFFFFF" },
                        ],
                      },
                      "Delete",
                    ),
                  ),
                ),
              ),
            ),
          )
        : null,
    );
  };

  const ExploreBlankPage = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(StatusBar, { barStyle: "dark-content" }),
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: props.title || "",
        showBack: true,
        onBack: props.onBack,
        showNext: false,
      }),
      React.createElement(
        View,
        {
          style: {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 40 + (insets.bottom || 0),
          },
        },
        React.createElement(
          Text,
          {
            style: [
              styles.blankExplorePageTitle,
              { color: theme.colors.primary },
            ],
          },
          props.title || "",
        ),
      ),
    );
  };

  const HomeScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const { data: countdownsData, refetch: refetchCountdowns } =
      useQuery("countdowns");
    const { data: homeQuizzesData } = useQuery("quizzes");
    const { data: homeAttemptLogsData } = useQuery("attemptLogs");
    const { mutate: insertCountdown } = useMutation("countdowns", "insert");
    const { mutate: updateCountdown } = useMutation("countdowns", "update");
    const { mutate: deleteCountdown } = useMutation("countdowns", "delete");

    const [showCountdownEditor, setShowCountdownEditor] = useState(false);
    const [editingCountdown, setEditingCountdown] = useState(null);
    const [countdownMenuTarget, setCountdownMenuTarget] = useState(null);
    const [countdownNow, setCountdownNow] = useState(new Date().toISOString());
    const [localCountdowns, setLocalCountdowns] = useState([]);
    const [homeSearchText, setHomeSearchText] = useState("");

    useEffect(function () {
      const timer = setInterval(function () {
        setCountdownNow(new Date().toISOString());
      }, 60000);
      return function () {
        clearInterval(timer);
      };
    }, []);

    useEffect(
      function () {
        setLocalCountdowns(
          Array.isArray(countdownsData) ? countdownsData.slice() : [],
        );
      },
      [countdownsData],
    );

    const countdowns = (localCountdowns || []).slice().sort(function (a, b) {
      return (
        new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
      );
    });

    const homeQuizzes = Array.isArray(homeQuizzesData) ? homeQuizzesData : [];
    const homeAttemptLogs = Array.isArray(homeAttemptLogsData)
      ? homeAttemptLogsData
      : [];
    const safeHomeSearchText = String(homeSearchText || "")
      .trim()
      .toLowerCase();
    const filteredHomeQuizzes = safeHomeSearchText
      ? homeQuizzes
          .filter(function (quiz) {
            const combinedText = [
              quiz && quiz.title ? quiz.title : "",
              quiz && quiz.folderName ? quiz.folderName : "",
              quiz && quiz.sourceFileName ? quiz.sourceFileName : "",
            ]
              .join(" ")
              .toLowerCase();
            return combinedText.indexOf(safeHomeSearchText) >= 0;
          })
          .slice()
          .sort(function (a, b) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
      : [];
    const latestHomeQuiz =
      homeQuizzes.slice().sort(function (a, b) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })[0] || null;
    const averageHomeScore =
      homeAttemptLogs.length > 0
        ? Math.round(
            homeAttemptLogs.reduce(function (sum, item) {
              return sum + (typeof item.score === "number" ? item.score : 0);
            }, 0) / homeAttemptLogs.length,
          )
        : 0;
    const weakAttemptCount = homeAttemptLogs.filter(function (item) {
      return typeof item.score === "number" && item.score < 70;
    }).length;

    const openCreateCountdown = function () {
      setEditingCountdown(null);
      setShowCountdownEditor(true);
    };

    const openEditCountdown = function (countdown) {
      setCountdownMenuTarget(null);
      setEditingCountdown(countdown);
      setShowCountdownEditor(true);
    };

    const saveCountdown = function (payload) {
      const basePayload = Object.assign({}, editingCountdown || {}, payload, {
        id:
          editingCountdown && editingCountdown.id
            ? editingCountdown.id
            : payload.id || makeId("countdown", "item"),
        createdAt:
          editingCountdown && editingCountdown.createdAt
            ? editingCountdown.createdAt
            : payload.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const refreshAndClose = function () {
        setCountdownNow(new Date().toISOString());
        setShowCountdownEditor(false);
        setEditingCountdown(null);
        if (refetchCountdowns) {
          return Promise.resolve(refetchCountdowns()).catch(function () {
            return null;
          });
        }
        return Promise.resolve();
      };

      if (editingCountdown && editingCountdown.id) {
        setLocalCountdowns(function (prev) {
          return (prev || []).map(function (item) {
            return item.id === editingCountdown.id ? basePayload : item;
          });
        });

        deleteCountdown({ id: editingCountdown.id })
          .then(function () {
            return insertCountdown(basePayload);
          })
          .then(function () {
            return refreshAndClose();
          })
          .catch(function () {
            return updateCountdown(basePayload)
              .then(function () {
                return refreshAndClose();
              })
              .catch(function (error) {
                setLocalCountdowns(function (prev) {
                  return (prev || []).map(function (item) {
                    return item.id === editingCountdown.id
                      ? editingCountdown
                      : item;
                  });
                });
                showMessage(
                  "Countdown Error",
                  error && error.message
                    ? error.message
                    : "Unable to save countdown.",
                );
              });
          });

        return;
      }

      setLocalCountdowns(function (prev) {
        return (prev || []).concat([basePayload]);
      });

      insertCountdown(basePayload)
        .then(function () {
          return refreshAndClose();
        })
        .catch(function (error) {
          setLocalCountdowns(function (prev) {
            return (prev || []).filter(function (item) {
              return item.id !== basePayload.id;
            });
          });
          showMessage(
            "Countdown Error",
            error && error.message
              ? error.message
              : "Unable to save countdown.",
          );
        });
    };

    const removeCountdown = function (countdown) {
      confirmAction(
        "Delete Countdown",
        'Delete "' + String(countdown.title || "this countdown") + '"?',
        function () {
          setLocalCountdowns(function (prev) {
            return (prev || []).filter(function (item) {
              return item.id !== countdown.id;
            });
          });

          deleteCountdown({ id: countdown.id })
            .then(function () {
              if (refetchCountdowns) {
                return Promise.resolve(refetchCountdowns()).catch(function () {
                  return null;
                });
              }
              return null;
            })
            .catch(function (error) {
              setLocalCountdowns(function (prev) {
                return (prev || []).concat([countdown]);
              });
              showMessage(
                "Countdown Error",
                error && error.message
                  ? error.message
                  : "Unable to delete countdown.",
              );
            });
        },
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: props.theme.colors.background } },
      React.createElement(
        ScrollView,
        {
          style: { flex: 1, backgroundColor: props.theme.colors.background },
          contentContainerStyle: {
            padding: 20,
            paddingBottom: 155 + (insets.bottom || 0),
          },
        },
        React.createElement(
          View,
          {
            style: [
              styles.homeSearchCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            {
              style: [
                styles.homeSearchInputWrap,
                {
                  backgroundColor: props.theme.colors.background,
                  borderColor: props.theme.colors.border,
                },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "search",
              size: 22,
              color: props.theme.colors.textSecondary,
            }),
            React.createElement(TextInput, {
              style: [
                styles.homeSearchInput,
                { color: props.theme.colors.textPrimary },
              ],
              placeholder: "Search your quizzes",
              placeholderTextColor: props.theme.colors.textSecondary,
              value: homeSearchText,
              onChangeText: setHomeSearchText,
              returnKeyType: "search",
              autoCorrect: false,
              autoCapitalize: "none",
            }),
            homeSearchText && homeSearchText.length > 0
              ? React.createElement(
                  TouchableOpacity,
                  {
                    style: styles.homeSearchClearButton,
                    onPress: function () {
                      setHomeSearchText("");
                    },
                  },
                  React.createElement(MaterialIcons, {
                    name: "close",
                    size: 18,
                    color: props.theme.colors.textSecondary,
                  }),
                )
              : null,
          ),
          safeHomeSearchText
            ? React.createElement(
                View,
                { style: styles.homeSearchResultsWrap },
                filteredHomeQuizzes.length === 0
                  ? React.createElement(
                      View,
                      {
                        style: [
                          styles.homeSearchEmptyBox,
                          {
                            backgroundColor: props.theme.colors.background,
                            borderColor: props.theme.colors.border,
                          },
                        ],
                      },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.homeSearchEmptyText,
                            { color: props.theme.colors.textSecondary },
                          ],
                        },
                        "No quiz matches your search yet.",
                      ),
                    )
                  : filteredHomeQuizzes.slice(0, 6).map(function (quiz) {
                      return React.createElement(
                        TouchableOpacity,
                        {
                          key: quiz.id,
                          style: [
                            styles.homeSearchResultItem,
                            {
                              backgroundColor: props.theme.colors.background,
                              borderColor: props.theme.colors.border,
                            },
                          ],
                          activeOpacity: 0.84,
                          onPress: function () {
                            setHomeSearchText("");
                            if (props.onOpenQuiz) {
                              props.onOpenQuiz(quiz, false, false);
                            } else if (props.onMyQuiz) {
                              props.onMyQuiz();
                            }
                          },
                        },
                        React.createElement(
                          View,
                          {
                            style: [
                              styles.homeSearchResultIcon,
                              { backgroundColor: props.theme.colors.lavender },
                            ],
                          },
                          React.createElement(MaterialIcons, {
                            name: "quiz",
                            size: 20,
                            color: props.theme.colors.accent,
                          }),
                        ),
                        React.createElement(
                          View,
                          { style: { flex: 1, paddingRight: 8 } },
                          React.createElement(
                            Text,
                            {
                              style: [
                                styles.homeSearchResultTitle,
                                { color: props.theme.colors.textPrimary },
                              ],
                              numberOfLines: 1,
                            },
                            quiz.title || "Untitled Quiz",
                          ),
                          React.createElement(
                            Text,
                            {
                              style: [
                                styles.homeSearchResultMeta,
                                { color: props.theme.colors.textSecondary },
                              ],
                              numberOfLines: 1,
                            },
                            (quiz.folderName || "Unfiled") +
                              " • " +
                              String(quiz.questionCount || 0) +
                              " question(s)",
                          ),
                        ),
                        React.createElement(MaterialIcons, {
                          name: "chevron-right",
                          size: 22,
                          color: props.theme.colors.textSecondary,
                        }),
                      );
                    }),
              )
            : React.createElement(
                Text,
                {
                  style: [
                    styles.homeSearchHint,
                    { color: props.theme.colors.textSecondary },
                  ],
                },
                "Find any saved quiz by title, folder, or source file.",
              ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.heroCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [styles.heroTitle, { color: props.theme.colors.primary }],
            },
            "Objective 100",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.heroSubtitle,
                { color: props.theme.colors.textSecondary },
              ],
            },
            "Your academic growth companion",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.bigActionButton,
                { backgroundColor: props.theme.colors.primary },
              ],
              onPress: props.onMyQuiz,
            },
            React.createElement(MaterialIcons, {
              name: "today",
              size: 24,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.bigActionButtonText },
              "Start Today’s Plan",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.outlineHomeButton,
                { borderColor: props.theme.colors.border },
              ],
              onPress: props.onCreateQuiz,
            },
            React.createElement(MaterialIcons, {
              name: "add-circle-outline",
              size: 22,
              color: props.theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.outlineHomeButtonText,
                  { color: props.theme.colors.primary },
                ],
              },
              "Create New Quiz",
            ),
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.countdownSectionCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.countdownSectionHeader },
            React.createElement(
              View,
              { style: { flex: 1, paddingRight: 12 } },
              React.createElement(
                Text,
                {
                  style: [
                    styles.countdownSectionTitle,
                    { color: props.theme.colors.textPrimary },
                  ],
                },
                "Next exam",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.countdownSectionSubtitle,
                    { color: props.theme.colors.textSecondary },
                  ],
                },
                "Build urgency early so every study session has purpose.",
              ),
            ),
          ),
          countdowns.length === 0
            ? React.createElement(
                View,
                {
                  style: [
                    styles.countdownEmptyCard,
                    {
                      backgroundColor: props.theme.colors.background,
                      borderColor: props.theme.colors.border,
                    },
                  ],
                },
                React.createElement(MaterialIcons, {
                  name: "event-busy",
                  size: 38,
                  color: props.theme.colors.textSecondary,
                }),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.countdownEmptyText,
                      { color: props.theme.colors.textSecondary },
                    ],
                  },
                  "Countdowns you add appear here",
                ),
              )
            : React.createElement(
                View,
                { style: styles.countdownGridWrap },
                countdowns.map(function (countdown) {
                  const display = getCountdownDisplayData(
                    countdown.targetDate,
                    countdownNow,
                  );

                  return React.createElement(
                    View,
                    {
                      key: countdown.id,
                      style: [
                        styles.countdownCard,
                        {
                          backgroundColor: props.theme.colors.primary,
                          borderColor: props.theme.colors.primary,
                        },
                      ],
                    },
                    React.createElement(
                      View,
                      { style: styles.countdownCardTopRow },
                      React.createElement(
                        View,
                        { style: { flex: 1, paddingRight: 8 } },
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.countdownCardTitle,
                              { color: "#FFFFFF" },
                            ],
                            numberOfLines: 1,
                          },
                          countdown.title || "Exam",
                        ),
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.countdownCardDate,
                              { color: "rgba(255,255,255,0.72)" },
                            ],
                          },
                          display.targetDateLabel,
                        ),
                      ),
                      React.createElement(
                        TouchableOpacity,
                        {
                          style: styles.countdownMenuTrigger,
                          onPress: function () {
                            setCountdownMenuTarget(countdown);
                          },
                        },
                        React.createElement(MaterialIcons, {
                          name: "more-vert",
                          size: 22,
                          color: "rgba(255,255,255,0.88)",
                        }),
                      ),
                    ),
                    React.createElement(
                      View,
                      { style: styles.simpleCountdownBody },
                      React.createElement(CountdownProgressRing, {
                        size: 100,
                        daysRemaining: display.daysRemaining,
                        fillColor: props.theme.colors.accent,
                        progressColor: props.theme.colors.periwinkle,
                        daysLabel: display.daysRemaining === 1 ? "Day" : "Days",
                      }),
                    ),
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.simpleCountdownStatus,
                          { color: "#FFFFFF" },
                        ],
                        numberOfLines: 2,
                      },
                      display.isPast
                        ? "Exam date passed"
                        : display.isDueToday
                          ? "Happening today"
                          : display.daysRemaining + " day(s) remaining",
                    ),
                  );
                }),
              ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.homeInfoCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.homeCardTitle,
                { color: props.theme.colors.textPrimary },
              ],
            },
            "Today’s Focus",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.homeCardText,
                { color: props.theme.colors.textSecondary },
              ],
            },
            "AI suggests: revise your weakest topic today.",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.primaryButton,
                { backgroundColor: props.theme.colors.primary, marginTop: 14 },
              ],
              onPress: props.onMyQuiz,
            },
            React.createElement(MaterialIcons, {
              name: "school",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.primaryButtonText },
              "Open Quizzes",
            ),
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.homeInfoCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.homeCardTitle,
                { color: props.theme.colors.textPrimary },
              ],
            },
            "Quick Stats",
          ),
          React.createElement(
            View,
            { style: styles.homeStatsRow },
            React.createElement(
              View,
              { style: styles.homeStatBox },
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatNumber,
                    { color: props.theme.colors.accent },
                  ],
                },
                homeAttemptLogs.length > 0
                  ? String(averageHomeScore) + "%"
                  : "—",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatLabel,
                    { color: props.theme.colors.textSecondary },
                  ],
                },
                "Average",
              ),
            ),
            React.createElement(
              View,
              { style: styles.homeStatBox },
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatNumber,
                    { color: props.theme.colors.accent },
                  ],
                },
                String(weakAttemptCount),
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatLabel,
                    { color: props.theme.colors.textSecondary },
                  ],
                },
                "Weak Trials",
              ),
            ),
            React.createElement(
              View,
              { style: styles.homeStatBox },
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatNumber,
                    { color: props.theme.colors.accent },
                  ],
                },
                String(homeAttemptLogs.length),
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.homeStatLabel,
                    { color: props.theme.colors.textSecondary },
                  ],
                },
                "Attempts",
              ),
            ),
          ),
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.homeInfoCard,
              {
                backgroundColor: props.theme.colors.card,
                borderColor: props.theme.colors.border,
              },
            ],
            activeOpacity: 0.86,
            onPress: props.onMyQuiz,
          },
          React.createElement(
            Text,
            {
              style: [
                styles.homeCardTitle,
                { color: props.theme.colors.textPrimary },
              ],
            },
            "Continue",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.homeCardText,
                { color: props.theme.colors.textSecondary },
              ],
            },
            latestHomeQuiz
              ? latestHomeQuiz.title
              : "Recently opened quiz appears here",
          ),
        ),
      ),
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.countdownFloatingButton,
            {
              backgroundColor: theme.colors.accent,
              bottom: 92 + (insets.bottom || 0),
            },
          ],
          onPress: openCreateCountdown,
        },
        React.createElement(MaterialIcons, {
          name: "add",
          size: 30,
          color: "#FFFFFF",
        }),
      ),
      React.createElement(CountdownActionMenuModal, {
        visible: !!countdownMenuTarget,
        countdown: countdownMenuTarget,
        onClose: function () {
          setCountdownMenuTarget(null);
        },
        onEdit: function (countdown) {
          openEditCountdown(countdown);
        },
        onDelete: function (countdown) {
          setCountdownMenuTarget(null);
          removeCountdown(countdown);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(CountdownEditorModal, {
        visible: showCountdownEditor,
        countdown: editingCountdown,
        onClose: function () {
          setShowCountdownEditor(false);
          setEditingCountdown(null);
        },
        onSave: saveCountdown,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "home",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const CreateQuizScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();
    const camera = useCamera();
    const takePhoto = camera.takePhoto;
    const pickImage = camera.pickImage;

    const [quizTitle, setQuizTitle] = useState("");
    const [sourceFileName, setSourceFileName] = useState("");
    const [capturedImages, setCapturedImages] = useState([]);
    const [extractedQuestions, setExtractedQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState("upload");
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [saving, setSaving] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropTargetImage, setCropTargetImage] = useState(null);
    const [markSchemeImages, setMarkSchemeImages] = useState([]);
    const [markSchemeText, setMarkSchemeText] = useState("");
    const [markSchemeAppliedAt, setMarkSchemeAppliedAt] = useState("");
    const [showMarkSchemeAssistModal, setShowMarkSchemeAssistModal] =
      useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(UNFILED_FOLDER_ID);
    const [showFolderPicker, setShowFolderPicker] = useState(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");
    const { mutate: insertFolder } = useMutation("folders", "insert");
    const { mutate: insertQuiz } = useMutation("quizzes", "insert");
    const { mutate: insertQuestion } = useMutation("questions", "insert");
    const { refetch: refetchQuizzes } = useQuery("quizzes");
    const { refetch: refetchQuestions } = useQuery("questions");

    const folderOptions = buildFolderListFromData(foldersData || [], []);
    const selectedFolder =
      folderOptions.find(function (folder) {
        return folder.id === selectedFolderId;
      }) || buildSystemUnfiledFolder();

    const createFolderAndSelect = function (folderName) {
      const trimmedName = normalizeFolderName(folderName);

      if (!trimmedName) {
        showMessage("Missing Folder Name", "Please enter a folder name.");
        return;
      }

      const existingFolder = folderOptions.find(function (folder) {
        return (
          String(folder.name || "").toLowerCase() === trimmedName.toLowerCase()
        );
      });

      if (existingFolder) {
        setSelectedFolderId(existingFolder.id);
        setShowCreateFolderModal(false);
        setShowFolderPicker(false);
        return;
      }

      const newFolder = {
        id: makeId(
          "folder",
          trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
        ),
        name: trimmedName,
        createdAt: new Date().toISOString(),
      };

      insertFolder(newFolder)
        .then(function () {
          setSelectedFolderId(newFolder.id);
          setShowCreateFolderModal(false);
          setShowFolderPicker(false);
          if (refetchFolders) return refetchFolders();
          return null;
        })
        .catch(function (error) {
          showMessage(
            "Folder Error",
            error && error.message ? error.message : "Unable to create folder.",
          );
        });
    };

    const addImagesToCapturedList = function (uriList) {
      const safeUris = (uriList || []).filter(Boolean);
      if (safeUris.length === 0) {
        showMessage("Image Error", "No valid image was returned.");
        return;
      }

      Promise.all(
        safeUris.map(function (uri, index) {
          return getImageSizeAsync(uri).then(function (size) {
            return {
              uri: normalizeUri(uri),
              id: makeId("img", capturedImages.length + index),
              sourceType: "image",
              sourceFileName: sourceFileName || "",
              sourceDocumentId: "",
              sourcePage: 0,
              cropIndex: capturedImages.length + index,
              cropRegions: [],
              imageWidth: size.width,
              imageHeight: size.height,
            };
          });
        }),
      ).then(function (newItems) {
        setCapturedImages(function (prev) {
          return dedupeImagesByUri(prev.concat(newItems));
        });
        setShowCameraModal(false);
      });
    };

    const handleTakePhoto = function () {
      takePhoto({ quality: 0.8 })
        .then(function (result) {
          if (result && result.error) {
            showMessage("Camera Error", result.error);
            return;
          }
          if (result && result.cancelled) return;
          addImagesToCapturedList(getImageUrisFromPickerResult(result));
        })
        .catch(function (error) {
          showMessage(
            "Camera Error",
            error && error.message ? error.message : "Unable to take photo.",
          );
        });
    };

    const handlePickImage = function () {
      pickImage({
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 0,
        quality: 0.9,
      })
        .then(function (result) {
          if (result && result.error) {
            showMessage("Gallery Error", result.error);
            return;
          }
          if (result && result.cancelled) return;
          addImagesToCapturedList(getImageUrisFromPickerResult(result));
        })
        .catch(function (error) {
          showMessage(
            "Gallery Error",
            error && error.message
              ? error.message
              : "Unable to choose image(s).",
          );
        });
    };

    const applyAnswerMapToReview = function (answerMap, sourceLabel) {
      const parsedCount = Object.keys(answerMap || {}).length;

      setExtractedQuestions(function (prev) {
        return applyMarkSchemeToQuestionList(prev, {
          answerMap: answerMap || {},
          sourceLabel: sourceLabel || "Uploaded Mark Scheme",
        });
      });
      setMarkSchemeAppliedAt(new Date().toISOString());
      setCurrentStep("review");

      return parsedCount;
    };

    const handleUploadMarkScheme = function () {
      if (extractedQuestions.length === 0) {
        showMessage(
          "No Questions",
          "Extract questions first before uploading a mark scheme.",
        );
        return;
      }

      pickImage({
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 0,
        quality: 0.9,
      })
        .then(function (result) {
          if (result && result.error) {
            showMessage("Mark Scheme Error", result.error);
            return;
          }
          if (result && result.cancelled) return;

          const uris = getImageUrisFromPickerResult(result);
          if (!uris || uris.length === 0) {
            showMessage(
              "Mark Scheme Error",
              "No mark scheme image was selected.",
            );
            return;
          }

          const uploaded = uris.map(function (uri, index) {
            return {
              id: makeId("markscheme", index),
              uri: normalizeUri(uri),
            };
          });

          setMarkSchemeImages(uploaded);
          setCurrentStep("review");

          const extractedAssetTextInfo =
            buildBestMarkSchemeTextFromPickerResult(result, markSchemeText);
          const combinedDetectedText =
            extractedAssetTextInfo.bestText ||
            extractedAssetTextInfo.mergedText ||
            "";
          const answerMapFromDetectedText = parseAnswerKeyFromText(
            combinedDetectedText,
            extractedQuestions.length,
          );
          const parsedCount = Object.keys(answerMapFromDetectedText).length;
          const imageLabel =
            "Uploaded Mark Scheme" +
            (uploaded.length > 1
              ? " (" + uploaded.length + " images)"
              : " (1 image)");

          if (combinedDetectedText && combinedDetectedText !== markSchemeText) {
            setMarkSchemeText(combinedDetectedText);
          }

          if (parsedCount > 0) {
            applyAnswerMapToReview(
              answerMapFromDetectedText,
              imageLabel + " + Auto Match",
            );
            showMessage(
              "Mark Scheme Applied",
              parsedCount +
                " answer(s) were matched automatically from the uploaded mark scheme asset. You can still open the matcher to correct any answer manually.",
            );
            return;
          }

          setShowMarkSchemeAssistModal(true);
          showMessage(
            "Mark Scheme Image Added",
            extractedAssetTextInfo.candidates &&
              extractedAssetTextInfo.candidates.length > 0
              ? "The image was attached, but the detected text did not contain a reliable numbered answer pattern. The matcher is now open so you can confirm the answers."
              : "The image was attached, but this build did not receive OCR text from the selected asset. The matcher is now open so you can confirm the answers.",
          );
        })
        .catch(function (error) {
          showMessage(
            "Mark Scheme Error",
            error && error.message
              ? error.message
              : "Unable to choose mark scheme image(s).",
          );
        });
    };

    const applyMarkSchemeAssistantAnswers = function (answerMap) {
      const parsedCount = applyAnswerMapToReview(
        answerMap,
        markSchemeImages.length > 0
          ? "Uploaded Mark Scheme (manual confirmation)"
          : "Manual Mark Scheme Confirmation",
      );

      setShowMarkSchemeAssistModal(false);

      showMessage(
        "Mark Scheme Applied",
        parsedCount > 0
          ? parsedCount + " answer(s) were mapped to the review cards."
          : "No answers were selected yet. The mark scheme image is still attached to the review.",
      );
    };

    const applyMarkSchemeTextToReview = function () {
      if (extractedQuestions.length === 0) {
        showMessage(
          "No Questions",
          "Extract questions first before applying a mark scheme.",
        );
        return;
      }

      const answerMap = parseAnswerKeyFromText(
        markSchemeText,
        extractedQuestions.length,
      );
      const detectedCount = Object.keys(answerMap).length;
      const parsedCount = applyAnswerMapToReview(
        answerMap,
        detectedCount > 0
          ? "Mark Scheme Parsed Text"
          : "Uploaded Mark Scheme Text (no answer pattern detected)",
      );

      if (parsedCount === 0 && markSchemeImages.length > 0) {
        setShowMarkSchemeAssistModal(true);
      }

      showMessage(
        "Mark Scheme Applied",
        parsedCount > 0
          ? parsedCount + " answer(s) were mapped to the review cards."
          : "No numbered answer pattern was detected. The mark scheme image is attached, and the manual matcher can be used to finish the mapping.",
      );
    };

    const removeCapturedImage = function (imageId) {
      setCapturedImages(function (prev) {
        return prev.filter(function (item) {
          return item.id !== imageId;
        });
      });
    };

    const updateCapturedImageMeasuredSize = function (imageId, size) {
      if (!imageId || !size || !size.width || !size.height) return;

      setCapturedImages(function (prev) {
        return prev.map(function (item) {
          if (item.id !== imageId) return item;
          if (
            item.imageWidth === size.width &&
            item.imageHeight === size.height
          ) {
            return item;
          }
          return Object.assign({}, item, {
            imageWidth: size.width,
            imageHeight: size.height,
          });
        });
      });
    };

    const openManualCropForImage = function (image) {
      setCropTargetImage(image);
      setShowCropModal(true);
    };

    const saveCropRegionsForImage = function (regions) {
      if (!cropTargetImage) return;

      const cleaned = normalizeRegionList(regions);

      setCapturedImages(function (prev) {
        return prev.map(function (img) {
          if (img.id === cropTargetImage.id) {
            return Object.assign({}, img, { cropRegions: cleaned });
          }
          return img;
        });
      });

      setShowCropModal(false);
      setCropTargetImage(null);
      showMessage(
        "Saved",
        cleaned.length + " crop region(s) saved for this image.",
      );
    };

    const buildExtractedQuestionsFromCrops = function () {
      if (!quizTitle.trim()) {
        showMessage("Missing Title", "Please enter a quiz title first.");
        return;
      }

      if (capturedImages.length === 0) {
        showMessage("No Images", "Please add some question images first.");
        return;
      }

      const finalQuestions = rebuildExtractedQuestionsFromImages(
        capturedImages,
        extractedQuestions,
        "",
      );

      if (finalQuestions.length === 0) {
        showMessage(
          "No Crops Yet",
          "Please tap each uploaded image and create manual crop regions first.",
        );
        return;
      }

      setExtractedQuestions(finalQuestions);
      setCurrentStep("review");
    };

    const removeExtractedQuestion = function (questionId) {
      setExtractedQuestions(function (prev) {
        return prev
          .filter(function (item) {
            return item.id !== questionId;
          })
          .map(function (item, index) {
            return Object.assign({}, item, {
              questionNumber: index + 1,
            });
          });
      });
    };

    const saveQuiz = function () {
      if (saving) return;

      if (!quizTitle.trim()) {
        showMessage("Missing Title", "Please enter a quiz title.");
        return;
      }

      if (extractedQuestions.length === 0) {
        showMessage("No Questions", "Please extract questions first.");
        return;
      }

      setSaving(true);

      const quizId = makeId("quiz", "main");
      const normalizedQuestions = extractedQuestions.map(function (q, i) {
        return normalizeQuestion(q, quizId, i);
      });

      const finalFolder = selectedFolder || buildSystemUnfiledFolder();

      const quizData = {
        id: quizId,
        title: quizTitle.trim(),
        createdAt: new Date().toISOString(),
        questionCount: normalizedQuestions.length,
        sourceFileName: sourceFileName || "",
        sourceType: "image_batch",
        uploadedQuestionImages: capturedImages,
        questionsSnapshot: normalizedQuestions,
        folderId: finalFolder.id,
        folderName: finalFolder.name,
      };

      insertQuiz(quizData)
        .then(function () {
          return Promise.all(
            normalizedQuestions.map(function (question) {
              return insertQuestion(question).catch(function () {
                return null;
              });
            }),
          );
        })
        .then(function () {
          const refreshers = [];
          if (refetchQuizzes) refreshers.push(refetchQuizzes());
          if (refetchQuestions) refreshers.push(refetchQuestions());
          if (refetchFolders) refreshers.push(refetchFolders());
          return Promise.all(refreshers);
        })
        .then(function () {
          setSaving(false);
          showMessage(
            "Success",
            'Quiz created successfully in "' + finalFolder.name + '".',
          );

          props.onSavedGoMyQuiz({
            id: quizId,
            title: quizData.title,
            createdAt: quizData.createdAt,
            questionCount: normalizedQuestions.length,
            sourceFileName: quizData.sourceFileName,
            sourceType: quizData.sourceType,
            uploadedQuestionImages: quizData.uploadedQuestionImages,
            questionsSnapshot: normalizedQuestions,
            folderId: quizData.folderId,
            folderName: quizData.folderName,
          });
        })
        .catch(function (error) {
          setSaving(false);
          showMessage(
            "Error",
            error && error.message ? error.message : "Unable to save quiz.",
          );
        });
    };

    const renderUploadStep = function () {
      return React.createElement(
        View,
        null,
        React.createElement(
          Text,
          { style: [styles.sectionTitle, { color: theme.colors.textPrimary }] },
          "Create Your Quiz",
        ),
        React.createElement(TextInput, {
          style: [
            styles.titleInput,
            {
              borderColor: theme.colors.border,
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.background,
            },
          ],
          placeholder: "Enter quiz title",
          placeholderTextColor: theme.colors.textSecondary,
          value: quizTitle,
          onChangeText: setQuizTitle,
        }),
        React.createElement(TextInput, {
          style: [
            styles.titleInput,
            {
              borderColor: theme.colors.border,
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.background,
            },
          ],
          placeholder: "Optional source file name",
          placeholderTextColor: theme.colors.textSecondary,
          value: sourceFileName,
          onChangeText: setSourceFileName,
        }),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.folderSelectorButton,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              },
            ],
            onPress: function () {
              setShowFolderPicker(true);
            },
          },
          React.createElement(
            View,
            { style: { flex: 1, paddingRight: 12 } },
            React.createElement(
              Text,
              {
                style: [
                  styles.folderSelectorLabel,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Save in folder",
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.folderSelectorValue,
                  { color: theme.colors.textPrimary },
                ],
              },
              selectedFolder.name,
            ),
          ),
          React.createElement(MaterialIcons, {
            name: "folder-open",
            size: 24,
            color: theme.colors.accent,
          }),
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.countdownInputHint,
              { color: theme.colors.textSecondary },
            ],
          },
          "Use an existing folder, or create a new one. If you choose no folder, the quiz will be saved in Unfiled.",
        ),
        React.createElement(
          View,
          {
            style: [
              styles.uploadBox,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(MaterialIcons, {
            name: "collections",
            size: 56,
            color: theme.colors.accent,
          }),
          React.createElement(
            Text,
            {
              style: [
                styles.uploadBoxTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "Add Question Images",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.uploadBoxDescription,
                { color: theme.colors.textSecondary },
              ],
            },
            "After upload, tap each image to manually create multiple crop regions.",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.primaryButton,
                { backgroundColor: theme.colors.primary },
              ],
              onPress: function () {
                setShowCameraModal(true);
              },
            },
            React.createElement(MaterialIcons, {
              name: "add-a-photo",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.primaryButtonText },
              "Add Images",
            ),
          ),
        ),
        capturedImages.length > 0
          ? React.createElement(
              View,
              { style: { marginTop: 20 } },
              React.createElement(
                Text,
                {
                  style: [
                    styles.previewTitle,
                    { color: theme.colors.textPrimary },
                  ],
                },
                capturedImages.length + " image(s) added",
              ),
              capturedImages.map(function (image) {
                const cropCount = (image.cropRegions || []).length;
                return React.createElement(
                  View,
                  {
                    key: image.id,
                    style: [
                      styles.uploadedImageCard,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                      },
                    ],
                  },
                  React.createElement(CroppedImageView, {
                    uri: image.uri,
                    imageWidth: image.imageWidth,
                    imageHeight: image.imageHeight,
                    width: 110,
                    borderRadius: 10,
                  }),
                  React.createElement(
                    View,
                    { style: { flex: 1, marginLeft: 12 } },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.reviewEditTitle,
                          { color: theme.colors.textPrimary },
                        ],
                      },
                      "Uploaded Page",
                    ),
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.questionMetaSmall,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      cropCount + " crop region(s) saved",
                    ),
                    React.createElement(
                      View,
                      {
                        style: {
                          flexDirection: "row",
                          marginTop: 10,
                          flexWrap: "wrap",
                        },
                      },
                      React.createElement(
                        TouchableOpacity,
                        {
                          style: [
                            styles.actionMiniButtonWrap,
                            {
                              backgroundColor: theme.colors.accent,
                              marginRight: 8,
                            },
                          ],
                          onPress: function () {
                            openManualCropForImage(image);
                          },
                        },
                        React.createElement(MaterialIcons, {
                          name: "crop-free",
                          size: 18,
                          color: "#FFFFFF",
                        }),
                        React.createElement(
                          Text,
                          { style: styles.actionMiniButtonText },
                          cropCount > 0 ? "Edit Crops" : "Add Crops",
                        ),
                      ),
                      React.createElement(
                        TouchableOpacity,
                        {
                          style: [
                            styles.actionMiniButtonWrap,
                            {
                              backgroundColor: theme.colors.error,
                              marginRight: 0,
                            },
                          ],
                          onPress: function () {
                            removeCapturedImage(image.id);
                          },
                        },
                        React.createElement(MaterialIcons, {
                          name: "delete",
                          size: 18,
                          color: "#FFFFFF",
                        }),
                        React.createElement(
                          Text,
                          { style: styles.actionMiniButtonText },
                          "Remove",
                        ),
                      ),
                    ),
                  ),
                );
              }),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.primaryButton,
                    { backgroundColor: theme.colors.accent, marginTop: 16 },
                  ],
                  onPress: buildExtractedQuestionsFromCrops,
                },
                React.createElement(MaterialIcons, {
                  name: "auto-awesome",
                  size: 20,
                  color: "#FFFFFF",
                }),
                React.createElement(
                  Text,
                  { style: styles.primaryButtonText },
                  "Extract Questions From Crops",
                ),
              ),
            )
          : null,
      );
    };

    const renderReviewStep = function () {
      return React.createElement(
        View,
        null,
        React.createElement(
          Text,
          { style: [styles.sectionTitle, { color: theme.colors.textPrimary }] },
          "Review Questions",
        ),
        React.createElement(
          View,
          {
            style: [
              styles.reviewSummaryCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [styles.previewTitle, { color: theme.colors.textPrimary }],
            },
            "Save destination",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.sectionDescription,
                { color: theme.colors.textSecondary, marginBottom: 0 },
              ],
            },
            'This quiz will be saved in: "' + selectedFolder.name + '"',
          ),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.reviewSummaryCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [styles.previewTitle, { color: theme.colors.textPrimary }],
            },
            "Upload Mark Scheme",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.sectionDescription,
                { color: theme.colors.textSecondary, marginBottom: 12 },
              ],
            },
            "Upload one or more mark scheme images. The parser now prioritises numbered table rows like 1 D 1, 2 D 1, 3 C 1 and maps them to Q1, Q2, Q3 automatically when OCR text is available from the selected asset. Every review card shows Answer Value and Answer Source. If your build still returns no OCR text for the image, paste scanned text below or use the built-in matcher to confirm answers manually.",
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.primaryButton,
                { backgroundColor: theme.colors.accent, marginBottom: 12 },
              ],
              onPress: handleUploadMarkScheme,
            },
            React.createElement(MaterialIcons, {
              name: "upload-file",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.primaryButtonText },
              markSchemeImages.length > 0
                ? "Re-upload Mark Scheme (" + markSchemeImages.length + ")"
                : "Upload Mark Scheme",
            ),
          ),
          React.createElement(TextInput, {
            style: [
              styles.ocrInput,
              {
                borderColor: theme.colors.border,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.card,
                minHeight: 88,
              },
            ],
            placeholder:
              "Optional: paste scanned answers, for example 1.A 2.C 3.B 4.D",
            placeholderTextColor: theme.colors.textSecondary,
            multiline: true,
            value: markSchemeText,
            onChangeText: setMarkSchemeText,
          }),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.primaryButton,
                { backgroundColor: theme.colors.primary, marginTop: 10 },
              ],
              onPress: applyMarkSchemeTextToReview,
            },
            React.createElement(MaterialIcons, {
              name: "fact-check",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.primaryButtonText },
              "Apply Mark Scheme Text",
            ),
          ),
          markSchemeImages.length > 0
            ? React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.primaryButton,
                    { backgroundColor: theme.colors.purpleSoft, marginTop: 10 },
                  ],
                  onPress: function () {
                    setShowMarkSchemeAssistModal(true);
                  },
                },
                React.createElement(MaterialIcons, {
                  name: "edit-note",
                  size: 20,
                  color: "#FFFFFF",
                }),
                React.createElement(
                  Text,
                  { style: styles.primaryButtonText },
                  "Open Mark Scheme Matcher",
                ),
              )
            : null,
          React.createElement(
            Text,
            {
              style: [
                styles.questionMetaSmall,
                {
                  color: theme.colors.textSecondary,
                  marginTop: 10,
                  marginBottom: 0,
                },
              ],
            },
            markSchemeAppliedAt
              ? "Last mark scheme update: " +
                  formatDateTime(markSchemeAppliedAt)
              : "No mark scheme uploaded yet.",
          ),
        ),
        extractedQuestions.map(function (question) {
          return React.createElement(
            View,
            {
              key: question.id,
              style: [
                styles.reviewEditCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              View,
              { style: styles.reviewEditTopRow },
              React.createElement(
                Text,
                {
                  style: [
                    styles.reviewEditTitle,
                    { color: theme.colors.textPrimary },
                  ],
                },
                "Question " + question.questionNumber,
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.reorderButton,
                    { backgroundColor: theme.colors.error },
                  ],
                  onPress: function () {
                    removeExtractedQuestion(question.id);
                  },
                },
                React.createElement(MaterialIcons, {
                  name: "delete",
                  size: 16,
                  color: "#FFFFFF",
                }),
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: styles.reviewEditBody,
                onPress: function () {
                  setSelectedQuestion(question);
                  setShowAnswerModal(true);
                },
              },
              React.createElement(CroppedImageView, {
                uri: question.imageUri,
                cropMeta: question.cropMeta,
                imageWidth: question.imageWidth,
                imageHeight: question.imageHeight,
                width: 100,
                borderRadius: 10,
              }),
              React.createElement(
                View,
                { style: { flex: 1, marginLeft: 12 } },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.questionMetaSmall,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Answer value: " +
                    (question.answerValue || question.correctAnswer || "-"),
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.questionMetaSmall,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Answer source: " +
                    (question.answerSource || "Manual / Default"),
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.questionMetaSmall,
                      { color: theme.colors.textSecondary },
                    ],
                    numberOfLines: 3,
                  },
                  question.questionText && question.questionText.trim()
                    ? question.questionText
                    : "Tap to edit answer, answer source and text.",
                ),
              ),
            ),
          );
        }),
        React.createElement(
          TouchableOpacity,
          {
            style: [
              styles.primaryButton,
              {
                backgroundColor: saving
                  ? theme.colors.disabled
                  : theme.colors.primary,
                marginTop: 20,
              },
            ],
            disabled: saving,
            onPress: saveQuiz,
          },
          React.createElement(MaterialIcons, {
            name: saving ? "hourglass-empty" : "save",
            size: 20,
            color: "#FFFFFF",
          }),
          React.createElement(
            Text,
            { style: styles.primaryButtonText },
            saving ? "Saving..." : 'Save Quiz to "' + selectedFolder.name + '"',
          ),
        ),
      );
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: currentStep === "upload" ? "Create Quiz" : "Review Quiz",
        showBack: true,
        onBack:
          currentStep === "review"
            ? function () {
                setCurrentStep("upload");
              }
            : props.onBack,
        showNext: currentStep === "upload" && capturedImages.length > 0,
        onNext: function () {
          if (currentStep === "upload") buildExtractedQuestionsFromCrops();
        },
      }),
      React.createElement(
        ScrollView,
        {
          style: { flex: 1 },
          contentContainerStyle: {
            padding: 20,
            paddingBottom: 100 + (insets.bottom || 0),
          },
        },
        currentStep === "upload" ? renderUploadStep() : renderReviewStep(),
      ),
      React.createElement(CameraPickerModal, {
        visible: showCameraModal,
        onClose: function () {
          setShowCameraModal(false);
        },
        onTakePhoto: handleTakePhoto,
        onPickImage: handlePickImage,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(ManualCropModal, {
        visible: showCropModal,
        image: cropTargetImage,
        initialRegions: cropTargetImage
          ? cropTargetImage.cropRegions || []
          : [],
        onClose: function () {
          setShowCropModal(false);
          setCropTargetImage(null);
        },
        onSave: saveCropRegionsForImage,
        onImageSizeDetected: function (size) {
          if (!cropTargetImage) return;
          updateCapturedImageMeasuredSize(cropTargetImage.id, size);
          setCropTargetImage(function (prev) {
            return prev
              ? Object.assign({}, prev, {
                  imageWidth: size.width,
                  imageHeight: size.height,
                })
              : prev;
          });
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(MarkSchemeAssistModal, {
        visible: showMarkSchemeAssistModal,
        images: markSchemeImages,
        questions: extractedQuestions,
        onClose: function () {
          setShowMarkSchemeAssistModal(false);
        },
        onApply: applyMarkSchemeAssistantAnswers,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(AnswerEditModal, {
        visible: showAnswerModal,
        question: selectedQuestion,
        onClose: function () {
          setShowAnswerModal(false);
        },
        onSave: function (payload) {
          if (!selectedQuestion) return;
          setExtractedQuestions(function (prev) {
            return prev.map(function (q) {
              return q.id === selectedQuestion.id
                ? Object.assign({}, q, payload)
                : q;
            });
          });
          setSelectedQuestion(function (prev) {
            return prev ? Object.assign({}, prev, payload) : prev;
          });
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderPickerModal, {
        visible: showFolderPicker,
        title: "Save in folder",
        folders: folderOptions,
        selectedFolderId: selectedFolderId,
        onClose: function () {
          setShowFolderPicker(false);
        },
        onSelect: function (folder) {
          setSelectedFolderId(folder.id);
          setShowFolderPicker(false);
        },
        onCreateNew: function () {
          setShowCreateFolderModal(true);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderNameEditorModal, {
        visible: showCreateFolderModal,
        title: "Create Folder",
        initialValue: "",
        onClose: function () {
          setShowCreateFolderModal(false);
        },
        onSave: createFolderAndSelect,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const PastTrialSummaryModal = function (props) {
    const theme = props.theme;
    const attempts = (props.attempts || []).slice().sort(function (a, b) {
      return (
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    });
    const [selectedAttemptId, setSelectedAttemptId] = useState(
      attempts.length > 0 ? attempts[0].id : null,
    );
    const [showTrialDropdown, setShowTrialDropdown] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);

    useEffect(
      function () {
        setSelectedAttemptId(attempts.length > 0 ? attempts[0].id : null);
        setShowTrialDropdown(false);
      },
      [props.visible, props.quiz ? props.quiz.id : "", attempts.length],
    );

    if (!props.visible || !props.quiz) return null;

    const selectedAttempt =
      attempts.find(function (attempt) {
        return attempt.id === selectedAttemptId;
      }) || (attempts.length > 0 ? attempts[0] : null);

    const selectedAttemptIndex = attempts.findIndex(function (attempt) {
      return selectedAttempt && attempt.id === selectedAttempt.id;
    });

    const selectedAttemptLabel = selectedAttempt
      ? "Trial " + String(attempts.length - selectedAttemptIndex)
      : "Select a trial";

    const reviewItems = sortReviewItemsForResults(
      selectedAttempt && selectedAttempt.answerReview
        ? selectedAttempt.answerReview
        : [],
    );

    const averageCorrectMarks =
      attempts.length > 0
        ? attempts.reduce(function (sum, attempt) {
            return sum + (attempt.correctAnswers || 0);
          }, 0) / attempts.length
        : 0;

    const averagePercentage =
      attempts.length > 0
        ? attempts.reduce(function (sum, attempt) {
            return sum + (attempt.score || 0);
          }, 0) / attempts.length
        : 0;

    const averageTotalQuestions =
      attempts.length > 0
        ? attempts.reduce(function (sum, attempt) {
            return sum + (attempt.totalQuestions || 0);
          }, 0) / attempts.length
        : 0;

    const averageMarksText =
      attempts.length > 0
        ? averageCorrectMarks.toFixed(2) +
          "/" +
          averageTotalQuestions.toFixed(2)
        : "0.00/0.00";

    const averagePercentageText =
      attempts.length > 0 ? averagePercentage.toFixed(1) + "%" : "0.0%";

    const getResultLabel = function (resultType) {
      if (resultType === "incorrect") return "Wrong";
      if (resultType === "skipped") return "Skipped";
      return "Correct";
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: false,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: props.insetsTop || 0,
          title: "Past Trial Summary",
          showBack: true,
          onBack: props.onClose,
          showNext: false,
        }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            contentContainerStyle: {
              padding: 16,
              paddingBottom: 100 + (props.insetsBottom || 0),
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.reviewSummaryCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  marginBottom: 16,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionTitle,
                  { color: theme.colors.textPrimary, fontSize: 22 },
                ],
              },
              props.quiz.title,
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionDescription,
                  { color: theme.colors.textSecondary, marginBottom: 0 },
                ],
              },
              attempts.length > 0
                ? attempts.length +
                    " past trial(s) saved. Latest retry always appears first."
                : "No past trials yet. Complete the quiz once to save a summary.",
            ),
          ),
          React.createElement(
            View,
            {
              style: [
                styles.resultsBreakdownCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              "Average Marks",
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsScoreText,
                  {
                    color: theme.colors.primary,
                    fontSize: 34,
                    marginTop: 0,
                    marginBottom: 6,
                    textAlign: "left",
                  },
                ],
              },
              averageMarksText,
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.quizMetaText,
                  { color: theme.colors.textSecondary, marginBottom: 12 },
                ],
              },
              "Average percentage: " + averagePercentageText,
            ),
            React.createElement(
              View,
              { style: styles.resultsBreakdownRow },
              React.createElement(
                View,
                {
                  style: [
                    styles.resultsBreakdownBox,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.primary,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownNumber,
                      { color: theme.colors.primary },
                    ],
                  },
                  attempts.length > 0 ? averageCorrectMarks.toFixed(2) : "0.00",
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownLabel,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Avg Correct",
                ),
              ),
              React.createElement(
                View,
                {
                  style: [
                    styles.resultsBreakdownBox,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.accent,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownNumber,
                      { color: theme.colors.accent },
                    ],
                  },
                  attempts.length > 0
                    ? averageTotalQuestions.toFixed(2)
                    : "0.00",
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownLabel,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Avg Total",
                ),
              ),
              React.createElement(
                View,
                {
                  style: [
                    styles.resultsBreakdownBox,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.success,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownNumber,
                      { color: theme.colors.success },
                    ],
                  },
                  averagePercentageText,
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownLabel,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Avg Score",
                ),
              ),
            ),
          ),
          attempts.length > 0
            ? React.createElement(
                View,
                { style: { marginBottom: 16 } },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.previewTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Choose a trial",
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.trialDropdownTrigger,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                      },
                    ],
                    activeOpacity: 0.9,
                    onPress: function () {
                      setShowTrialDropdown(true);
                    },
                  },
                  React.createElement(
                    View,
                    { style: { flex: 1, paddingRight: 12 } },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.trialDropdownLabel,
                          { color: theme.colors.textPrimary },
                        ],
                      },
                      selectedAttemptLabel,
                    ),
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.trialDropdownMeta,
                          { color: theme.colors.textSecondary },
                        ],
                      },
                      selectedAttempt
                        ? formatDateTime(selectedAttempt.completedAt)
                        : "Tap to choose a saved trial",
                    ),
                  ),
                  React.createElement(
                    View,
                    {
                      style: [
                        styles.trialHistoryScoreBadge,
                        {
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                          marginRight: 10,
                        },
                      ],
                    },
                    React.createElement(
                      Text,
                      {
                        style: [
                          styles.trialHistoryScoreBadgeText,
                          { color: theme.colors.textPrimary },
                        ],
                      },
                      selectedAttempt
                        ? String(selectedAttempt.correctAnswers || 0) +
                            "/" +
                            String(selectedAttempt.totalQuestions || 0)
                        : "-",
                    ),
                  ),
                  React.createElement(MaterialIcons, {
                    name: "arrow-drop-down",
                    size: 28,
                    color: theme.colors.textPrimary,
                  }),
                ),
              )
            : null,
          selectedAttempt
            ? React.createElement(
                View,
                null,
                React.createElement(
                  View,
                  {
                    style: [
                      styles.resultsBreakdownCard,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                      },
                    ],
                  },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.resultsBreakdownTitle,
                        { color: theme.colors.textPrimary },
                      ],
                    },
                    "Selected Trial Summary",
                  ),
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.quizMetaText,
                        { color: theme.colors.textSecondary, marginBottom: 12 },
                      ],
                    },
                    "Completed: " + formatDateTime(selectedAttempt.completedAt),
                  ),
                  React.createElement(
                    View,
                    { style: styles.resultsBreakdownRow },
                    React.createElement(
                      View,
                      {
                        style: [
                          styles.resultsBreakdownBox,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.error,
                          },
                        ],
                      },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownNumber,
                            { color: theme.colors.error },
                          ],
                        },
                        String(selectedAttempt.incorrectAnswers || 0),
                      ),
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownLabel,
                            { color: theme.colors.textSecondary },
                          ],
                        },
                        "Wrong",
                      ),
                    ),
                    React.createElement(
                      View,
                      {
                        style: [
                          styles.resultsBreakdownBox,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.warning,
                          },
                        ],
                      },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownNumber,
                            { color: theme.colors.warning },
                          ],
                        },
                        String(selectedAttempt.skippedAnswers || 0),
                      ),
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownLabel,
                            { color: theme.colors.textSecondary },
                          ],
                        },
                        "Skipped",
                      ),
                    ),
                    React.createElement(
                      View,
                      {
                        style: [
                          styles.resultsBreakdownBox,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.success,
                          },
                        ],
                      },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownNumber,
                            { color: theme.colors.success },
                          ],
                        },
                        String(selectedAttempt.correctAnswers || 0),
                      ),
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsBreakdownLabel,
                            { color: theme.colors.textSecondary },
                          ],
                        },
                        "Correct",
                      ),
                    ),
                  ),
                ),
                reviewItems.map(function (item) {
                  const badgeColor =
                    item.resultType === "incorrect"
                      ? theme.colors.error
                      : item.resultType === "skipped"
                        ? theme.colors.warning
                        : theme.colors.success;

                  return React.createElement(
                    View,
                    {
                      key: item.id,
                      style: [
                        styles.resultsQuestionCard,
                        {
                          backgroundColor: theme.colors.card,
                          borderColor: theme.colors.border,
                        },
                      ],
                    },
                    React.createElement(
                      View,
                      { style: styles.resultsQuestionTopRow },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.resultsQuestionTitle,
                            { color: theme.colors.textPrimary },
                          ],
                        },
                        "Question " +
                          String(
                            item.originalQuestionNumber ||
                              item.questionNumber ||
                              "",
                          ),
                      ),
                      React.createElement(
                        View,
                        {
                          style: [
                            styles.resultTypeBadge,
                            { backgroundColor: badgeColor },
                          ],
                        },
                        React.createElement(
                          Text,
                          { style: styles.resultTypeBadgeText },
                          getResultLabel(item.resultType),
                        ),
                      ),
                    ),
                    React.createElement(
                      TouchableOpacity,
                      {
                        activeOpacity: 0.9,
                        onPress: function () {
                          setZoomedImage({
                            uri: item.imageUri,
                            cropMeta: item.cropMeta,
                            imageWidth: item.imageWidth,
                            imageHeight: item.imageHeight,
                            title:
                              "Question " +
                              String(
                                item.originalQuestionNumber ||
                                  item.questionNumber ||
                                  "",
                              ),
                          });
                        },
                      },
                      React.createElement(CroppedImageView, {
                        uri: item.imageUri,
                        cropMeta: item.cropMeta,
                        imageWidth: item.imageWidth,
                        imageHeight: item.imageHeight,
                        width: 300,
                        borderRadius: 12,
                      }),
                    ),
                    React.createElement(
                      View,
                      { style: styles.answerCompareRow },
                      React.createElement(
                        View,
                        {
                          style: [
                            styles.answerCompareBox,
                            {
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.border,
                            },
                          ],
                        },
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.answerCompareLabel,
                              { color: theme.colors.textSecondary },
                            ],
                          },
                          "Your answer",
                        ),
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.answerCompareValue,
                              { color: theme.colors.textPrimary },
                            ],
                          },
                          item.userAnswerLabel || "-",
                        ),
                      ),
                      React.createElement(
                        View,
                        {
                          style: [
                            styles.answerCompareBox,
                            {
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.border,
                            },
                          ],
                        },
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.answerCompareLabel,
                              { color: theme.colors.textSecondary },
                            ],
                          },
                          "Correct answer",
                        ),
                        React.createElement(
                          Text,
                          {
                            style: [
                              styles.answerCompareValue,
                              { color: theme.colors.success },
                            ],
                          },
                          item.correctAnswerLabel || "-",
                        ),
                      ),
                    ),
                  );
                }),
              )
            : React.createElement(
                View,
                {
                  style: [
                    styles.resultsBreakdownCard,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ],
                },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.resultsBreakdownTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "No saved trial to display",
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.sectionDescription,
                      { color: theme.colors.textSecondary, marginBottom: 0 },
                    ],
                  },
                  "When the user retries the quiz, a fresh summary is stored and shown here automatically.",
                ),
              ),
        ),
        React.createElement(
          Modal,
          {
            visible: showTrialDropdown,
            transparent: true,
            animationType: "fade",
            onRequestClose: function () {
              setShowTrialDropdown(false);
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.modalOverlay,
                {
                  paddingTop: props.insetsTop,
                  paddingBottom: props.insetsBottom,
                },
              ],
            },
            React.createElement(
              View,
              {
                style: [
                  styles.trialDropdownModalCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                View,
                { style: styles.modalTopRow },
                React.createElement(
                  Text,
                  {
                    style: [styles.modalTitle, { color: theme.colors.primary }],
                  },
                  "Choose a trial",
                ),
                React.createElement(DismissButton, {
                  onPress: function () {
                    setShowTrialDropdown(false);
                  },
                  color: theme.colors.textPrimary,
                }),
              ),
              React.createElement(
                ScrollView,
                {
                  style: { maxHeight: 420 },
                  showsVerticalScrollIndicator: false,
                },
                attempts.map(function (attempt, index) {
                  const selected =
                    selectedAttempt && selectedAttempt.id === attempt.id;
                  return React.createElement(
                    TouchableOpacity,
                    {
                      key: attempt.id,
                      style: [
                        styles.trialHistoryButton,
                        {
                          backgroundColor: selected
                            ? theme.colors.primary
                            : theme.colors.background,
                          borderColor: selected
                            ? theme.colors.primary
                            : theme.colors.border,
                        },
                      ],
                      onPress: function () {
                        setSelectedAttemptId(attempt.id);
                        setShowTrialDropdown(false);
                      },
                    },
                    React.createElement(
                      View,
                      { style: { flex: 1, paddingRight: 12 } },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.trialHistoryTitle,
                            {
                              color: selected
                                ? "#FFFFFF"
                                : theme.colors.textPrimary,
                            },
                          ],
                        },
                        "Trial " + String(attempts.length - index),
                      ),
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.trialHistoryMeta,
                            {
                              color: selected
                                ? "rgba(255,255,255,0.9)"
                                : theme.colors.textSecondary,
                            },
                          ],
                        },
                        formatDateTime(attempt.completedAt),
                      ),
                    ),
                    React.createElement(
                      View,
                      {
                        style: [
                          styles.trialHistoryScoreBadge,
                          {
                            backgroundColor: selected
                              ? "rgba(255,255,255,0.18)"
                              : theme.colors.card,
                            borderColor: selected
                              ? "rgba(255,255,255,0.25)"
                              : theme.colors.border,
                          },
                        ],
                      },
                      React.createElement(
                        Text,
                        {
                          style: [
                            styles.trialHistoryScoreBadgeText,
                            {
                              color: selected
                                ? "#FFFFFF"
                                : theme.colors.textPrimary,
                            },
                          ],
                        },
                        String(attempt.correctAnswers || 0) +
                          "/" +
                          String(attempt.totalQuestions || 0),
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
        ),
        React.createElement(QuestionZoomModal, {
          visible: !!zoomedImage,
          image: zoomedImage,
          title: zoomedImage ? zoomedImage.title : "Question Preview",
          onClose: function () {
            setZoomedImage(null);
          },
          theme: theme,
          insetsTop: props.insetsTop,
          insetsBottom: props.insetsBottom,
          screenWidth: props.screenWidth,
        }),
      ),
    );
  };

  const QuizOptionsActionSheet = function (props) {
    const theme = props.theme;
    const quiz = props.quiz;

    if (!props.visible || !quiz) return null;

    const optionRow = function (label, iconName, color, onPress) {
      return React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.actionSheetRow,
            { borderBottomColor: theme.colors.border },
          ],
          activeOpacity: 0.82,
          onPress: onPress,
        },
        React.createElement(MaterialIcons, {
          name: iconName,
          size: 22,
          color: color || theme.colors.accent,
        }),
        React.createElement(
          Text,
          {
            style: [
              styles.actionSheetRowText,
              { color: color || theme.colors.textPrimary },
            ],
          },
          label,
        ),
      );
    };

    return React.createElement(
      Modal,
      {
        visible: props.visible,
        transparent: true,
        animationType: "slide",
        onRequestClose: props.onClose,
      },
      React.createElement(
        TouchableOpacity,
        {
          activeOpacity: 1,
          onPress: props.onClose,
          style: [
            styles.modalOverlay,
            {
              justifyContent: "flex-end",
              paddingTop: props.insetsTop || 0,
              paddingBottom: props.insetsBottom || 0,
            },
          ],
        },
        React.createElement(
          View,
          {
            style: [
              styles.actionSheetCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
                marginBottom: 10 + (props.insetsBottom || 0),
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [styles.actionSheetTitle, { color: theme.colors.primary }],
            },
            "Quiz Options",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.actionSheetSubtitle,
                { color: theme.colors.textSecondary },
              ],
            },
            quiz.title || "Selected quiz",
          ),
          optionRow(
            "Shuffle Quiz",
            "shuffle",
            theme.colors.textPrimary,
            function () {
              props.onShuffle(quiz);
            },
          ),
          optionRow(
            "Past Trials",
            "history",
            theme.colors.textPrimary,
            function () {
              props.onPastTrials(quiz);
            },
          ),
          optionRow(
            "Move to Folder",
            "drive-file-move",
            theme.colors.textPrimary,
            function () {
              props.onMove(quiz);
            },
          ),
          optionRow("Rename", "edit", theme.colors.textPrimary, function () {
            props.onRename(quiz);
          }),
          optionRow("Delete", "delete", theme.colors.error, function () {
            props.onDelete(quiz);
          }),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.actionSheetCancelButton,
                { backgroundColor: theme.colors.background },
              ],
              onPress: props.onClose,
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.actionSheetCancelText,
                  { color: theme.colors.textPrimary },
                ],
              },
              "Cancel",
            ),
          ),
        ),
      ),
    );
  };

  const MyQuizScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();

    const {
      data: quizzes,
      loading,
      refetch: refetchQuizzes,
    } = useQuery("quizzes");
    const { data: attemptLogs, refetch: refetchAttempts } =
      useQuery("attemptLogs");
    const { data: questionsData, refetch: refetchQuestions } =
      useQuery("questions");
    const { data: foldersData, refetch: refetchFolders } = useQuery("folders");

    const { mutate: deleteQuizMutation } = useMutation("quizzes", "delete");
    const { mutate: insertQuizMutation } = useMutation("quizzes", "insert");
    const { mutate: updateQuizMutation } = useMutation("quizzes", "update");
    const { mutate: deleteQuestionMutation } = useMutation(
      "questions",
      "delete",
    );
    const { mutate: deleteAttemptMutation } = useMutation(
      "attemptLogs",
      "delete",
    );
    const { mutate: insertFolder } = useMutation("folders", "insert");
    const { mutate: updateFolderMutation } = useMutation("folders", "update");
    const { mutate: deleteFolderMutation } = useMutation("folders", "delete");

    const [localQuizList, setLocalQuizList] = useState(quizzes || []);
    const [searchText, setSearchText] = useState("");
    const quizList = localQuizList || [];
    const attempts = attemptLogs || [];
    const allQuestions = questionsData || [];
    const folderList = buildFolderListFromData(foldersData || [], quizList);
    const safeQuizSearch = String(searchText || "")
      .trim()
      .toLowerCase();
    const visibleQuizList = safeQuizSearch
      ? quizList.filter(function (quiz) {
          const folderName = getFolderNameForQuiz(quiz, folderList);
          return (
            String(quiz.title || "")
              .toLowerCase()
              .indexOf(safeQuizSearch) >= 0 ||
            String(folderName || "")
              .toLowerCase()
              .indexOf(safeQuizSearch) >= 0
          );
        })
      : quizList;

    useEffect(
      function () {
        setLocalQuizList(quizzes || []);
      },
      [quizzes],
    );

    const [showPastTrialsModal, setShowPastTrialsModal] = useState(false);
    const [historyQuiz, setHistoryQuiz] = useState(null);
    const [activeTab, setActiveTab] = useState("folders");
    const [selectedFolderForDetail, setSelectedFolderForDetail] =
      useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
    const [movingQuizTarget, setMovingQuizTarget] = useState(null);
    const [showMoveQuizPicker, setShowMoveQuizPicker] = useState(false);
    const [showQuickCreateMenu, setShowQuickCreateMenu] = useState(false);
    const [quizOptionsTarget, setQuizOptionsTarget] = useState(null);
    const [showRenameQuizModal, setShowRenameQuizModal] = useState(false);
    const [renamingQuizTarget, setRenamingQuizTarget] = useState(null);

    useEffect(
      function () {
        if (props.refreshToken) {
          if (refetchQuizzes) refetchQuizzes();
          if (refetchAttempts) refetchAttempts();
          if (refetchQuestions) refetchQuestions();
          if (refetchFolders) refetchFolders();
        }
      },
      [props.refreshToken],
    );

    const getLatestAttemptForQuiz = function (quizId) {
      const filtered = attempts
        .filter(function (item) {
          return item.quizId === quizId;
        })
        .sort(function (a, b) {
          return (
            new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime()
          );
        });

      return filtered.length > 0 ? filtered[0] : null;
    };

    const getAttemptsForQuiz = function (quizId) {
      return attempts
        .filter(function (item) {
          return item.quizId === quizId;
        })
        .sort(function (a, b) {
          return (
            new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime()
          );
        });
    };

    const createFolder = function (folderName) {
      const trimmedName = normalizeFolderName(folderName);

      if (!trimmedName) {
        showMessage("Missing Folder Name", "Please enter a folder name.");
        return;
      }

      const existingFolder = folderList.find(function (folder) {
        return (
          String(folder.name || "").toLowerCase() === trimmedName.toLowerCase()
        );
      });

      if (existingFolder) {
        setShowCreateFolderModal(false);
        showMessage("Folder Exists", "That folder already exists.");
        return;
      }

      const newFolder = {
        id: makeId(
          "folder",
          trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
        ),
        name: trimmedName,
        createdAt: new Date().toISOString(),
      };

      insertFolder(newFolder)
        .then(function () {
          setShowCreateFolderModal(false);
          if (movingQuizTarget) {
            return moveQuizToFolder(movingQuizTarget, newFolder);
          }
          if (refetchFolders) return refetchFolders();
          return null;
        })
        .catch(function (error) {
          showMessage(
            "Folder Error",
            error && error.message ? error.message : "Unable to create folder.",
          );
        });
    };

    const moveQuizToFolder = function (quiz, folder) {
      if (!quiz || !folder) return Promise.resolve();

      const nextFolder =
        folder.id === UNFILED_FOLDER_ID ? buildSystemUnfiledFolder() : folder;
      const previousQuiz = Object.assign({}, quiz);
      const updatedQuiz = Object.assign({}, quiz, {
        folderId: nextFolder.id,
        folderName: nextFolder.name,
      });

      setLocalQuizList(function (prev) {
        return (prev || []).map(function (item) {
          return item.id === updatedQuiz.id ? updatedQuiz : item;
        });
      });

      const finalizeSuccess = function () {
        setShowMoveQuizPicker(false);
        setMovingQuizTarget(null);
        if (refetchQuizzes) {
          Promise.resolve(refetchQuizzes()).catch(function () {
            return null;
          });
        }
        if (refetchFolders) {
          Promise.resolve(refetchFolders()).catch(function () {
            return null;
          });
        }
        if (selectedFolderForDetail) {
          if (selectedFolderForDetail.id === nextFolder.id) {
            setSelectedFolderForDetail(Object.assign({}, nextFolder));
          } else if (
            selectedFolderForDetail.id === getFolderIdForQuiz(previousQuiz)
          ) {
            setSelectedFolderForDetail(
              Object.assign({}, selectedFolderForDetail),
            );
          }
        }
        showMessage(
          "Quiz Moved",
          '"' +
            String(updatedQuiz.title || "Quiz") +
            '" moved to "' +
            String(nextFolder.name || "Unfiled") +
            '".',
        );
      };

      const rollbackMove = function (error) {
        setLocalQuizList(function (prev) {
          return (prev || []).map(function (item) {
            return item.id === previousQuiz.id ? previousQuiz : item;
          });
        });
        showMessage(
          "Move Quiz Error",
          error && error.message
            ? error.message
            : "Unable to move quiz to that folder.",
        );
      };

      return updateQuizMutation(updatedQuiz)
        .then(function () {
          finalizeSuccess();
        })
        .catch(function () {
          return deleteQuizMutation({ id: previousQuiz.id })
            .then(function () {
              return insertQuizMutation(updatedQuiz);
            })
            .then(function () {
              finalizeSuccess();
            })
            .catch(function (error) {
              rollbackMove(error);
            });
        });
    };

    const renameFolder = function (nextName) {
      const folder = selectedFolderForDetail;
      const trimmedName = normalizeFolderName(nextName);

      if (!folder || folder.isSystem) {
        setShowRenameFolderModal(false);
        return;
      }

      if (!trimmedName) {
        showMessage("Missing Folder Name", "Please enter a folder name.");
        return;
      }

      const duplicateFolder = folderList.find(function (item) {
        return (
          item.id !== folder.id &&
          String(item.name || "").toLowerCase() === trimmedName.toLowerCase()
        );
      });

      if (duplicateFolder) {
        showMessage("Folder Exists", "That folder name already exists.");
        return;
      }

      const renamedFolder = Object.assign({}, folder, {
        name: trimmedName,
      });

      updateFolderMutation(renamedFolder)
        .then(function () {
          const relatedQuizzes = quizList.filter(function (quiz) {
            return getFolderIdForQuiz(quiz) === folder.id;
          });

          return Promise.all(
            relatedQuizzes.map(function (quiz) {
              return updateQuizMutation(
                Object.assign({}, quiz, {
                  folderId: folder.id,
                  folderName: trimmedName,
                }),
              ).catch(function () {
                return null;
              });
            }),
          );
        })
        .then(function () {
          setShowRenameFolderModal(false);
          setSelectedFolderForDetail(renamedFolder);
          if (refetchFolders) refetchFolders();
          if (refetchQuizzes) refetchQuizzes();
        })
        .catch(function (error) {
          showMessage(
            "Rename Folder Error",
            error && error.message ? error.message : "Unable to rename folder.",
          );
        });
    };

    const deleteFolderOnlyIfEmpty = function (folder) {
      if (!folder || folder.isSystem) {
        showMessage("Folder Locked", "The Unfiled folder cannot be deleted.");
        return;
      }

      const folderQuizCount = quizList.filter(function (quiz) {
        return getFolderIdForQuiz(quiz) === folder.id;
      }).length;

      if (folderQuizCount > 0) {
        showMessage(
          "Folder Not Empty",
          "Move or delete all quizzes inside this folder before deleting it.",
        );
        return;
      }

      confirmAction(
        "Delete Folder",
        'Delete folder "' + String(folder.name || "this folder") + '"?',
        function () {
          deleteFolderMutation({ id: folder.id })
            .then(function () {
              setSelectedFolderForDetail(null);
              if (refetchFolders) refetchFolders();
            })
            .catch(function (error) {
              showMessage(
                "Delete Folder Error",
                error && error.message
                  ? error.message
                  : "Unable to delete folder.",
              );
            });
        },
      );
    };

    const deleteQuizFully = function (quiz) {
      confirmAction(
        "Delete Quiz",
        "Delete this quiz and all related data?",
        function () {
          const relatedQuestions = allQuestions.filter(function (q) {
            return q.quizId === quiz.id;
          });
          const relatedAttempts = attempts.filter(function (a) {
            return a.quizId === quiz.id;
          });

          setLocalQuizList(function (prev) {
            return (prev || []).filter(function (item) {
              return item.id !== quiz.id;
            });
          });

          Promise.all(
            relatedQuestions
              .map(function (q) {
                return deleteQuestionMutation({ id: q.id }).catch(
                  function () {},
                );
              })
              .concat(
                relatedAttempts.map(function (a) {
                  return deleteAttemptMutation({ id: a.id }).catch(
                    function () {},
                  );
                }),
              ),
          )
            .then(function () {
              return deleteQuizMutation({ id: quiz.id });
            })
            .then(function () {
              if (refetchQuizzes) refetchQuizzes();
              if (refetchAttempts) refetchAttempts();
              if (refetchQuestions) refetchQuestions();
              if (
                selectedFolderForDetail &&
                getFolderIdForQuiz(quiz) === selectedFolderForDetail.id
              ) {
                setSelectedFolderForDetail(function (prev) {
                  return prev ? Object.assign({}, prev) : prev;
                });
              }
            })
            .catch(function () {
              setLocalQuizList(function (prev) {
                const exists = (prev || []).some(function (item) {
                  return item.id === quiz.id;
                });
                return exists ? prev : (prev || []).concat([quiz]);
              });
            });
        },
      );
    };

    const renameQuiz = function (nextTitle) {
      const quiz = renamingQuizTarget;
      const trimmedTitle = nextTitle ? String(nextTitle).trim() : "";

      if (!quiz) {
        setShowRenameQuizModal(false);
        return;
      }

      if (!trimmedTitle) {
        showMessage("Missing Quiz Title", "Please enter a quiz title.");
        return;
      }

      const updatedQuiz = Object.assign({}, quiz, { title: trimmedTitle });

      setLocalQuizList(function (prev) {
        return (prev || []).map(function (item) {
          return item.id === quiz.id ? updatedQuiz : item;
        });
      });

      updateQuizMutation(updatedQuiz)
        .then(function () {
          setShowRenameQuizModal(false);
          setRenamingQuizTarget(null);
          if (refetchQuizzes) refetchQuizzes();
        })
        .catch(function () {
          return deleteQuizMutation({ id: quiz.id })
            .then(function () {
              return insertQuizMutation(updatedQuiz);
            })
            .then(function () {
              setShowRenameQuizModal(false);
              setRenamingQuizTarget(null);
              if (refetchQuizzes) refetchQuizzes();
            })
            .catch(function (error) {
              setLocalQuizList(function (prev) {
                return (prev || []).map(function (item) {
                  return item.id === quiz.id ? quiz : item;
                });
              });
              showMessage(
                "Rename Quiz Error",
                error && error.message
                  ? error.message
                  : "Unable to rename quiz.",
              );
            });
        });
    };

    const renderQuizCard = function (quiz) {
      const latestAttempt = getLatestAttemptForQuiz(quiz.id);
      const ratioText = latestAttempt
        ? latestAttempt.correctAnswers + "/" + latestAttempt.totalQuestions
        : "No attempt yet";
      const practiceReviewItems = latestAttempt
        ? sortReviewItemsForResults(latestAttempt.answerReview || []).filter(
            function (item) {
              return (
                item.resultType === "incorrect" || item.resultType === "skipped"
              );
            },
          )
        : [];
      const practiceCount = practiceReviewItems.length;
      const folderName = getFolderNameForQuiz(quiz, folderList);

      return React.createElement(
        View,
        {
          key: quiz.id,
          style: [
            styles.quizListCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
        },
        React.createElement(
          View,
          { style: styles.quizListTopRow },
          React.createElement(
            Text,
            {
              style: [
                styles.quizListTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            quiz.title,
          ),
          React.createElement(
            View,
            {
              style: [
                styles.quizCountBadge,
                { backgroundColor: theme.colors.primary },
              ],
            },
            React.createElement(
              Text,
              { style: styles.quizCountBadgeText },
              (quiz.questionCount || 0) + " Q",
            ),
          ),
        ),
        React.createElement(
          View,
          { style: styles.quizMetaChipRow },
          React.createElement(
            View,
            {
              style: [
                styles.folderNameChip,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(MaterialIcons, {
              name: "folder",
              size: 15,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.folderNameChipText,
                  { color: theme.colors.textPrimary },
                ],
              },
              folderName,
            ),
          ),
        ),
        React.createElement(
          Text,
          {
            style: [styles.quizMetaText, { color: theme.colors.textSecondary }],
          },
          "Created: " + formatDateTime(quiz.createdAt),
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.quizMetaText,
              { color: theme.colors.textSecondary, marginTop: 4 },
            ],
          },
          "Latest score: " + ratioText,
        ),
        React.createElement(
          View,
          { style: styles.quizActionButtonsRowWrap },
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.actionMiniButtonWrap,
                { backgroundColor: theme.colors.primary, flexGrow: 1 },
              ],
              onPress: function () {
                props.onOpenQuiz(quiz, false);
              },
            },
            React.createElement(MaterialIcons, {
              name: "play-arrow",
              size: 18,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.actionMiniButtonText },
              "Start",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.actionMiniButtonWrap,
                {
                  backgroundColor:
                    practiceCount > 0
                      ? theme.colors.accent
                      : theme.colors.disabled,
                  flexGrow: 1,
                },
              ],
              onPress: function () {
                if (practiceCount > 0) props.onOpenQuiz(quiz, false, true);
                else
                  showMessage(
                    "No Repair Questions",
                    "Complete the quiz first. Wrong or skipped questions will appear here for repair practice.",
                  );
              },
            },
            React.createElement(MaterialIcons, {
              name: "school",
              size: 18,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.actionMiniButtonText },
              "Repair",
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.actionMiniButtonWrap,
                { backgroundColor: theme.colors.lavender, flexGrow: 1 },
              ],
              onPress: function () {
                setQuizOptionsTarget(quiz);
              },
            },
            React.createElement(MaterialIcons, {
              name: "more-horiz",
              size: 18,
              color: theme.colors.accent,
            }),
            React.createElement(
              Text,
              {
                style: [
                  styles.actionMiniButtonText,
                  { color: theme.colors.accent },
                ],
              },
              "More",
            ),
          ),
        ),
      );
    };

    const renderFoldersTab = function () {
      const folderCards = folderList.map(function (folder) {
        const folderQuizCount = quizList.filter(function (quiz) {
          return getFolderIdForQuiz(quiz) === folder.id;
        }).length;

        return React.createElement(
          TouchableOpacity,
          {
            key: folder.id,
            style: [
              styles.folderCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
            onPress: function () {
              setSelectedFolderForDetail(folder);
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.folderCardIconWrap,
                { backgroundColor: theme.colors.lavender },
              ],
            },
            React.createElement(MaterialIcons, {
              name: folder.id === UNFILED_FOLDER_ID ? "inventory-2" : "folder",
              size: 28,
              color: theme.colors.accent,
            }),
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.folderCardTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            folder.name,
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.folderCardMeta,
                { color: theme.colors.textSecondary },
              ],
            },
            folderQuizCount + " quiz(es)",
          ),
        );
      });

      return React.createElement(
        View,
        null,
        React.createElement(
          View,
          {
            style: [
              styles.reviewSummaryCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.sectionTitle,
                { color: theme.colors.textPrimary, fontSize: 22 },
              ],
            },
            "Folders",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.sectionDescription,
                { color: theme.colors.textSecondary, marginBottom: 0 },
              ],
            },
            "Use flat mobile folders only. Tap the + button at the bottom-left to create a new folder or a new quiz.",
          ),
        ),
        React.createElement(View, { style: styles.folderGrid }, folderCards),
      );
    };

    const renderAllQuizzesTab = function () {
      const sortedQuizzes = visibleQuizList.slice().sort(function (a, b) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      if (sortedQuizzes.length === 0) {
        return React.createElement(
          View,
          { style: styles.emptyStateWrap },
          React.createElement(
            Text,
            {
              style: [
                styles.emptyStateTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "No quizzes yet",
          ),
        );
      }

      return React.createElement(
        View,
        null,
        sortedQuizzes.map(function (quiz) {
          return renderQuizCard(quiz);
        }),
      );
    };

    const renderRecentTab = function () {
      const recentQuizzes = getRecentQuizzes(visibleQuizList, 8);

      if (recentQuizzes.length === 0) {
        return React.createElement(
          View,
          { style: styles.emptyStateWrap },
          React.createElement(
            Text,
            {
              style: [
                styles.emptyStateTitle,
                { color: theme.colors.textPrimary },
              ],
            },
            "No recent quizzes yet",
          ),
        );
      }

      return React.createElement(
        View,
        null,
        React.createElement(
          View,
          {
            style: [
              styles.reviewSummaryCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.sectionTitle,
                { color: theme.colors.textPrimary, fontSize: 22 },
              ],
            },
            "Recent",
          ),
          React.createElement(
            Text,
            {
              style: [
                styles.sectionDescription,
                { color: theme.colors.textSecondary, marginBottom: 0 },
              ],
            },
            "Recent is a smart section, not a manual folder.",
          ),
        ),
        recentQuizzes.map(function (quiz) {
          return renderQuizCard(quiz);
        }),
      );
    };

    const renderActiveTab = function () {
      if (activeTab === "all") return renderAllQuizzesTab();
      if (activeTab === "recent") return renderRecentTab();
      return renderFoldersTab();
    };

    return React.createElement(
      View,
      { style: { flex: 1, backgroundColor: theme.colors.background } },
      React.createElement(AppHeader, {
        theme: theme,
        topInset: insets.top,
        title: "Quizzes",
        showBack: true,
        onBack: props.onBack,
        showNext: false,
      }),
      loading
        ? React.createElement(ActivityIndicator, {
            style: { flex: 1 },
            size: "large",
            color: theme.colors.primary,
          })
        : React.createElement(
            ScrollView,
            {
              style: { flex: 1 },
              contentContainerStyle: {
                padding: 16,
                paddingBottom: 100 + (insets.bottom || 0),
              },
            },
            React.createElement(TextInput, {
              style: [
                styles.searchInput,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.textPrimary,
                  backgroundColor: theme.colors.card,
                  marginBottom: 14,
                },
              ],
              placeholder: "Search quizzes",
              placeholderTextColor: theme.colors.disabled,
              value: searchText,
              onChangeText: setSearchText,
            }),
            React.createElement(
              View,
              { style: styles.topTabsRow },
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.topTabButton,
                    {
                      backgroundColor:
                        activeTab === "folders"
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor:
                        activeTab === "folders"
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setActiveTab("folders");
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color:
                        activeTab === "folders"
                          ? "#FFFFFF"
                          : theme.colors.textPrimary,
                      fontWeight: "800",
                    },
                  },
                  "Folders",
                ),
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.topTabButton,
                    {
                      backgroundColor:
                        activeTab === "all"
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor:
                        activeTab === "all"
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setActiveTab("all");
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color:
                        activeTab === "all"
                          ? "#FFFFFF"
                          : theme.colors.textPrimary,
                      fontWeight: "800",
                    },
                  },
                  "All Quizzes",
                ),
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [
                    styles.topTabButton,
                    {
                      backgroundColor:
                        activeTab === "recent"
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor:
                        activeTab === "recent"
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ],
                  onPress: function () {
                    setActiveTab("recent");
                  },
                },
                React.createElement(
                  Text,
                  {
                    style: {
                      color:
                        activeTab === "recent"
                          ? "#FFFFFF"
                          : theme.colors.textPrimary,
                      fontWeight: "800",
                    },
                  },
                  "Recent",
                ),
              ),
            ),
            renderActiveTab(),
          ),
      React.createElement(PastTrialSummaryModal, {
        visible: showPastTrialsModal,
        quiz: historyQuiz,
        attempts: historyQuiz ? getAttemptsForQuiz(historyQuiz.id) : [],
        onClose: function () {
          setShowPastTrialsModal(false);
          setHistoryQuiz(null);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
        screenWidth: 360,
      }),
      React.createElement(FolderDetailModal, {
        visible: !!selectedFolderForDetail,
        folder: selectedFolderForDetail,
        quizzes: quizList,
        onClose: function () {
          setSelectedFolderForDetail(null);
        },
        onRenameFolder: function (folder) {
          setSelectedFolderForDetail(folder);
          setShowRenameFolderModal(true);
        },
        onDeleteFolder: deleteFolderOnlyIfEmpty,
        renderQuizCard: renderQuizCard,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderPickerModal, {
        visible: showMoveQuizPicker,
        folders: folderList,
        selectedFolderId: movingQuizTarget
          ? getFolderIdForQuiz(movingQuizTarget)
          : UNFILED_FOLDER_ID,
        title: movingQuizTarget
          ? 'Move "' + String(movingQuizTarget.title || "Quiz") + '"'
          : "Move Quiz",
        onClose: function () {
          setShowMoveQuizPicker(false);
          setMovingQuizTarget(null);
        },
        onSelect: function (folder) {
          moveQuizToFolder(movingQuizTarget, folder);
        },
        onCreateNew: function () {
          setShowCreateFolderModal(true);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderNameEditorModal, {
        visible: showCreateFolderModal,
        title: "Create Folder",
        initialValue: "",
        onClose: function () {
          setShowCreateFolderModal(false);
        },
        onSave: createFolder,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderNameEditorModal, {
        visible: showRenameFolderModal,
        title: "Rename Folder",
        initialValue: selectedFolderForDetail
          ? selectedFolderForDetail.name
          : "",
        onClose: function () {
          setShowRenameFolderModal(false);
        },
        onSave: renameFolder,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.quickCreateFab,
            {
              backgroundColor: theme.colors.accent,
              left: 18,
              bottom: 92 + (insets.bottom || 0),
            },
          ],
          onPress: function () {
            setShowQuickCreateMenu(true);
          },
        },
        React.createElement(MaterialIcons, {
          name: "add",
          size: 30,
          color: "#FFFFFF",
        }),
      ),
      React.createElement(QuickCreateMenuModal, {
        visible: showQuickCreateMenu,
        onClose: function () {
          setShowQuickCreateMenu(false);
        },
        onCreateFolder: function () {
          setShowQuickCreateMenu(false);
          setShowCreateFolderModal(true);
        },
        onCreateQuiz: function () {
          setShowQuickCreateMenu(false);
          if (props.onCreateQuiz) props.onCreateQuiz();
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(QuizOptionsActionSheet, {
        visible: !!quizOptionsTarget,
        quiz: quizOptionsTarget,
        onClose: function () {
          setQuizOptionsTarget(null);
        },
        onShuffle: function (quiz) {
          setQuizOptionsTarget(null);
          props.onOpenQuiz(quiz, true);
        },
        onPastTrials: function (quiz) {
          setQuizOptionsTarget(null);
          setHistoryQuiz(quiz);
          setShowPastTrialsModal(true);
        },
        onMove: function (quiz) {
          setQuizOptionsTarget(null);
          setMovingQuizTarget(quiz);
          setShowMoveQuizPicker(true);
        },
        onRename: function (quiz) {
          setQuizOptionsTarget(null);
          setRenamingQuizTarget(quiz);
          setShowRenameQuizModal(true);
        },
        onDelete: function (quiz) {
          setQuizOptionsTarget(null);
          deleteQuizFully(quiz);
        },
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(FolderNameEditorModal, {
        visible: showRenameQuizModal,
        title: "Rename Quiz",
        initialValue: renamingQuizTarget ? renamingQuizTarget.title : "",
        onClose: function () {
          setShowRenameQuizModal(false);
          setRenamingQuizTarget(null);
        },
        onSave: renameQuiz,
        theme: theme,
        insetsTop: insets.top,
        insetsBottom: insets.bottom,
      }),
      React.createElement(BottomTabBar, {
        theme: theme,
        active: "myQuiz",
        onSelect: props.onTabSelect,
        insetsBottom: insets.bottom,
      }),
    );
  };

  const QuizResultsView = function (props) {
    const theme = props.theme;
    const results = props.results;
    const reviewItems = sortReviewItemsForResults(results.answerReview || []);
    const [zoomedImage, setZoomedImage] = useState(null);

    const getResultLabel = function (resultType) {
      if (resultType === "incorrect") return "Wrong";
      if (resultType === "skipped") return "Skipped";
      return "Correct";
    };

    return React.createElement(
      ScrollView,
      {
        style: { flex: 1 },
        contentContainerStyle: { padding: 20, paddingBottom: 100 },
      },
      React.createElement(
        View,
        {
          style: [
            styles.resultsCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
        },
        React.createElement(MaterialIcons, {
          name: "emoji-events",
          size: 72,
          color: theme.colors.warning,
        }),
        React.createElement(
          Text,
          {
            style: [
              styles.resultsBigTitle,
              { color: theme.colors.textPrimary },
            ],
          },
          "Quiz Finished",
        ),
        React.createElement(
          Text,
          { style: [styles.resultsScoreText, { color: theme.colors.primary }] },
          results.score + "%",
        ),
      ),
      React.createElement(
        View,
        {
          style: [
            styles.resultsBreakdownCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ],
        },
        React.createElement(
          Text,
          {
            style: [
              styles.resultsBreakdownTitle,
              { color: theme.colors.textPrimary },
            ],
          },
          "Review Summary",
        ),
        React.createElement(
          View,
          { style: styles.resultsBreakdownRow },
          React.createElement(
            View,
            {
              style: [
                styles.resultsBreakdownBox,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.error,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownNumber,
                  { color: theme.colors.error },
                ],
              },
              String(results.incorrect || 0),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownLabel,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Wrong",
            ),
          ),
          React.createElement(
            View,
            {
              style: [
                styles.resultsBreakdownBox,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.warning,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownNumber,
                  { color: theme.colors.warning },
                ],
              },
              String(results.skipped || 0),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownLabel,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Skipped",
            ),
          ),
          React.createElement(
            View,
            {
              style: [
                styles.resultsBreakdownBox,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.success,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownNumber,
                  { color: theme.colors.success },
                ],
              },
              String(results.correct || 0),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsBreakdownLabel,
                  { color: theme.colors.textSecondary },
                ],
              },
              "Correct",
            ),
          ),
        ),
      ),
      reviewItems.map(function (item) {
        const badgeColor =
          item.resultType === "incorrect"
            ? theme.colors.error
            : item.resultType === "skipped"
              ? theme.colors.warning
              : theme.colors.success;

        return React.createElement(
          View,
          {
            key: item.id,
            style: [
              styles.resultsQuestionCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ],
          },
          React.createElement(
            View,
            { style: styles.resultsQuestionTopRow },
            React.createElement(
              Text,
              {
                style: [
                  styles.resultsQuestionTitle,
                  { color: theme.colors.textPrimary },
                ],
              },
              "Question " + item.originalQuestionNumber,
            ),
            React.createElement(
              View,
              {
                style: [
                  styles.resultTypeBadge,
                  { backgroundColor: badgeColor },
                ],
              },
              React.createElement(
                Text,
                { style: styles.resultTypeBadgeText },
                getResultLabel(item.resultType),
              ),
            ),
          ),
          React.createElement(
            TouchableOpacity,
            {
              activeOpacity: 0.9,
              onPress: function () {
                setZoomedImage({
                  uri: item.imageUri,
                  cropMeta: item.cropMeta,
                  imageWidth: item.imageWidth,
                  imageHeight: item.imageHeight,
                  title: "Question " + item.originalQuestionNumber,
                });
              },
            },
            React.createElement(CroppedImageView, {
              uri: item.imageUri,
              cropMeta: item.cropMeta,
              imageWidth: item.imageWidth,
              imageHeight: item.imageHeight,
              width: 300,
              borderRadius: 12,
            }),
          ),
          React.createElement(
            View,
            { style: styles.answerCompareRow },
            React.createElement(
              View,
              {
                style: [
                  styles.answerCompareBox,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.answerCompareLabel,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Your answer",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.answerCompareValue,
                    { color: theme.colors.textPrimary },
                  ],
                },
                item.userAnswerLabel || "-",
              ),
            ),
            React.createElement(
              View,
              {
                style: [
                  styles.answerCompareBox,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.answerCompareLabel,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Correct answer",
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.answerCompareValue,
                    { color: theme.colors.success },
                  ],
                },
                item.correctAnswerLabel || "-",
              ),
            ),
          ),
        );
      }),
      React.createElement(
        TouchableOpacity,
        {
          style: [
            styles.primaryButton,
            { backgroundColor: theme.colors.primary, marginTop: 8 },
          ],
          onPress: props.onDone,
        },
        React.createElement(MaterialIcons, {
          name: "home",
          size: 20,
          color: "#FFFFFF",
        }),
        React.createElement(
          Text,
          { style: styles.primaryButtonText },
          props.doneLabel || "Back to My Quiz",
        ),
      ),
      React.createElement(QuestionZoomModal, {
        visible: !!zoomedImage,
        image: zoomedImage,
        title: zoomedImage ? zoomedImage.title : "Question Preview",
        onClose: function () {
          setZoomedImage(null);
        },
        theme: theme,
        insetsTop: props.insetsTop,
        insetsBottom: props.insetsBottom,
        screenWidth: props.screenWidth,
      }),
    );
  };

  const TakeQuizScreen = function (props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const insets = useSafeAreaInsets();

    const { data: questionsData } = useQuery("questions");
    const { data: attemptLogs, refetch: refetchAttempts } =
      useQuery("attemptLogs");
    const { mutate: insertAttemptLog } = useMutation("attemptLogs", "insert");

    const [questions, setQuestions] = useState([]);
    const [studentAnswers, setStudentAnswers] = useState({});
    const [currentView, setCurrentView] = useState("quiz");
    const [showResults, setShowResults] = useState(false);
    const [quizResults, setQuizResults] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);

    const initializedSessionKeyRef = useRef(null);
    const quizScrollRef = useRef(null);
    const questionYMapRef = useRef({});

    useEffect(
      function () {
        const allQuestions = questionsData || [];

        const tableQuestions = allQuestions
          .filter(function (q) {
            return q.quizId === props.quiz.id;
          })
          .sort(function (a, b) {
            return (a.questionNumber || 0) - (b.questionNumber || 0);
          });

        const snapshotQuestions = (props.quiz.questionsSnapshot || [])
          .slice()
          .sort(function (a, b) {
            return (a.questionNumber || 0) - (b.questionNumber || 0);
          });

        const baseQuestions = pickBestQuestionSource(
          tableQuestions,
          snapshotQuestions,
          props.quiz.id,
        );

        const attemptList = (attemptLogs || [])
          .filter(function (item) {
            return item.quizId === props.quiz.id;
          })
          .sort(function (a, b) {
            return (
              new Date(b.completedAt).getTime() -
              new Date(a.completedAt).getTime()
            );
          });

        const latestAttempt = attemptList.length > 0 ? attemptList[0] : null;

        const makeSessionQuestions = function () {
          let sessionQuestions = props.practiceMode
            ? getPracticeQuestionsFromLatestAttempt(
                baseQuestions,
                latestAttempt,
              )
            : baseQuestions.slice();

          if (!props.practiceMode && props.shuffleMode) {
            sessionQuestions = shuffleArray(sessionQuestions).map(
              function (question, index) {
                return Object.assign({}, question, {
                  questionNumber: index + 1,
                  originalQuestionNumber:
                    typeof question.originalQuestionNumber === "number"
                      ? question.originalQuestionNumber
                      : typeof question.questionNumber === "number"
                        ? question.questionNumber
                        : index + 1,
                });
              },
            );
          } else {
            sessionQuestions = sessionQuestions.map(function (question, index) {
              return Object.assign({}, question, {
                questionNumber: index + 1,
                originalQuestionNumber:
                  typeof question.originalQuestionNumber === "number"
                    ? question.originalQuestionNumber
                    : typeof question.questionNumber === "number"
                      ? question.questionNumber
                      : index + 1,
              });
            });
          }

          return sessionQuestions;
        };

        const sessionKey =
          props.quiz.id +
          "_" +
          (props.practiceMode
            ? "practice"
            : props.shuffleMode
              ? "shuffle"
              : "normal") +
          "_" +
          (props.practiceMode && latestAttempt ? latestAttempt.id : "base");

        if (initializedSessionKeyRef.current !== sessionKey) {
          initializedSessionKeyRef.current = sessionKey;

          const sessionQuestions = makeSessionQuestions();

          setQuestions(sessionQuestions);
          setStudentAnswers({});
          setCurrentView("quiz");
          setShowResults(false);
          setQuizResults(null);
          setZoomedImage(null);
          questionYMapRef.current = {};
        } else if (!questions || questions.length === 0) {
          setQuestions(makeSessionQuestions());
        }
      },
      [
        props.quiz.id,
        props.shuffleMode,
        props.practiceMode,
        questionsData,
        attemptLogs,
        props.quiz.questionsSnapshot,
      ],
    );

    const selectAnswerForQuestion = function (questionId, option) {
      setStudentAnswers(function (prev) {
        const next = Object.assign({}, prev);
        next[questionId] = option;
        return next;
      });
    };

    const skipQuestion = function (questionId) {
      setStudentAnswers(function (prev) {
        const next = Object.assign({}, prev);
        next[questionId] = "SKIPPED";
        return next;
      });
    };

    const clearQuestionAnswer = function (questionId) {
      setStudentAnswers(function (prev) {
        const next = Object.assign({}, prev);
        delete next[questionId];
        return next;
      });
    };

    const getQuestionAnswer = function (questionId) {
      return studentAnswers[questionId] || "";
    };

    const getAnswerStatus = function (question) {
      const answer = studentAnswers[question.id];
      if (!answer) return "Not answered";
      if (answer === "SKIPPED") return "Skipped";
      return "Answered: " + answer;
    };

    const getAnsweredCount = function () {
      return questions.filter(function (question) {
        const answer = studentAnswers[question.id];
        return !!answer && answer !== "SKIPPED";
      }).length;
    };

    const getSkippedCount = function () {
      return questions.filter(function (question) {
        return studentAnswers[question.id] === "SKIPPED";
      }).length;
    };

    const getPendingCount = function () {
      return questions.filter(function (question) {
        return !studentAnswers[question.id];
      }).length;
    };

    const buildAnswerReview = function (finalAnswers) {
      return questions.map(function (question, index) {
        const answer = finalAnswers[question.id];
        const isSkipped = !answer || answer === "SKIPPED";
        const isCorrect = !isSkipped && answer === question.correctAnswer;
        const resultType = isSkipped
          ? "skipped"
          : isCorrect
            ? "correct"
            : "incorrect";

        return {
          id: makeId("reviewItem", index),
          questionId: question.id,
          sourceQuestionId: question.sourceQuestionId || question.id,
          sourceCropId: question.sourceCropId || question.id,
          quizId: props.quiz.id,
          questionNumber: index + 1,
          originalQuestionNumber:
            typeof question.originalQuestionNumber === "number"
              ? question.originalQuestionNumber
              : typeof question.questionNumber === "number"
                ? question.questionNumber
                : index + 1,
          imageUri: question.imageUri || "",
          imageWidth: question.imageWidth || 1200,
          imageHeight: question.imageHeight || 1600,
          cropMeta: question.cropMeta || null,
          questionText: question.questionText || "",
          userAnswer: isSkipped ? "SKIPPED" : answer,
          userAnswerLabel: isSkipped ? "Skipped" : answer || "-",
          correctAnswer: question.correctAnswer || "",
          correctAnswerLabel: question.correctAnswer || "-",
          resultType: resultType,
        };
      });
    };

    const finishQuiz = function (finalAnswers) {
      let correctCount = 0;
      let incorrectCount = 0;
      let skippedCount = 0;

      questions.forEach(function (question) {
        const answer = finalAnswers[question.id];
        if (!answer || answer === "SKIPPED") {
          skippedCount++;
        } else if (answer === question.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });

      const answerReview = buildAnswerReview(finalAnswers);
      const sortedAnswerReview = sortReviewItemsForResults(answerReview);

      const results = {
        totalQuestions: questions.length,
        correct: correctCount,
        incorrect: incorrectCount,
        skipped: skippedCount,
        score:
          questions.length > 0
            ? Math.round((correctCount / questions.length) * 100)
            : 0,
        completedAt: new Date().toISOString(),
        shuffleMode: !!props.shuffleMode,
        answerReview: sortedAnswerReview,
      };

      setQuizResults(results);
      setShowResults(true);

      if (props.practiceMode) {
        return;
      }

      insertAttemptLog({
        id: makeId("attempt", "log"),
        quizId: props.quiz.id,
        score: results.score,
        correctAnswers: results.correct,
        totalQuestions: results.totalQuestions,
        completedAt: results.completedAt,
        incorrectAnswers: results.incorrect,
        skippedAnswers: results.skipped,
        shuffleMode: !!props.shuffleMode,
        answerReview: sortedAnswerReview,
      })
        .then(function () {
          if (refetchAttempts) refetchAttempts();
          if (props.onAttemptSaved) props.onAttemptSaved();
        })
        .catch(function () {});
    };

    const goToQuizQuestion = function (questionId) {
      setCurrentView("quiz");

      setTimeout(function () {
        const y = questionYMapRef.current[questionId];
        if (quizScrollRef.current && typeof y === "number") {
          quizScrollRef.current.scrollTo({
            y: Math.max(0, y - 12),
            animated: true,
          });
        }
      }, 200);
    };

    if (!questions || questions.length === 0) {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: insets.top,
          title: props.practiceMode
            ? "Practice Wrong/Skipped"
            : props.quiz.title,
          showBack: true,
          onBack: props.onBack,
          showNext: false,
        }),
        React.createElement(
          View,
          { style: styles.emptyStateWrap },
          React.createElement(ActivityIndicator, {
            size: "large",
            color: theme.colors.primary,
          }),
          React.createElement(
            Text,
            {
              style: [
                styles.emptyStateText,
                { color: theme.colors.textSecondary, marginTop: 12 },
              ],
            },
            props.practiceMode
              ? "No wrong or skipped questions to practise right now. This practice page updates automatically from the latest completed full quiz attempt."
              : "Loading questions...",
          ),
        ),
      );
    }

    if (showResults && quizResults) {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: insets.top,
          title: props.practiceMode ? "Practice Results" : "Results",
          showBack: true,
          onBack: props.onDone,
          showNext: false,
        }),
        React.createElement(QuizResultsView, {
          theme: theme,
          results: quizResults,
          onDone: props.onDone,
          doneLabel: props.practiceMode ? "Back to My Quiz" : "Back to My Quiz",
          insetsTop: insets.top,
          insetsBottom: insets.bottom,
          screenWidth: 360,
        }),
      );
    }

    const renderOptionButton = function (question, option) {
      const selectedAnswer = getQuestionAnswer(question.id);
      const isSelected = selectedAnswer === option;
      const label = question["option" + option] || "Option " + option;

      return React.createElement(
        TouchableOpacity,
        {
          key: question.id + "_" + option,
          style: [
            styles.mcqButton,
            {
              backgroundColor: isSelected
                ? theme.colors.primary
                : theme.colors.card,
              borderColor: isSelected
                ? theme.colors.primary
                : theme.colors.border,
            },
          ],
          onPress: function () {
            selectAnswerForQuestion(question.id, option);
          },
        },
        React.createElement(
          View,
          {
            style: [
              styles.mcqCircle,
              {
                borderColor: isSelected ? "#FFFFFF" : theme.colors.border,
                backgroundColor: isSelected ? "#FFFFFF" : "transparent",
              },
            ],
          },
          React.createElement(
            Text,
            {
              style: [
                styles.mcqCircleText,
                {
                  color: isSelected
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                },
              ],
            },
            option,
          ),
        ),
        React.createElement(
          Text,
          {
            style: [
              styles.mcqLabel,
              { color: isSelected ? "#FFFFFF" : theme.colors.textPrimary },
            ],
          },
          label,
        ),
      );
    };

    const renderQuizPage = function () {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: insets.top,
          title: props.quiz.title,
          showBack: true,
          onBack: props.onBack,
          showNext: false,
        }),
        React.createElement(
          ScrollView,
          {
            ref: quizScrollRef,
            style: { flex: 1 },
            nestedScrollEnabled: true,
            keyboardShouldPersistTaps: "handled",
            showsVerticalScrollIndicator: true,
            contentContainerStyle: {
              padding: 20,
              paddingBottom: 130 + (insets.bottom || 0),
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.reviewSummaryCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  marginBottom: 18,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionTitle,
                  {
                    color: theme.colors.textPrimary,
                    marginBottom: 8,
                    fontSize: 22,
                  },
                ],
              },
              props.quiz.title +
                (props.practiceMode
                  ? " (Practice Wrong/Skipped)"
                  : props.shuffleMode
                    ? " (Shuffled)"
                    : ""),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionDescription,
                  { color: theme.colors.textSecondary, marginBottom: 0 },
                ],
              },
              "Answered: " +
                getAnsweredCount() +
                "   |   Skipped: " +
                getSkippedCount() +
                "   |   Pending: " +
                getPendingCount() +
                "   |   Total: " +
                questions.length,
            ),
          ),
          questions.map(function (question, index) {
            const selectedAnswer = getQuestionAnswer(question.id);
            const statusText = getAnswerStatus(question);
            const statusColor =
              selectedAnswer === "SKIPPED"
                ? theme.colors.warning
                : selectedAnswer
                  ? theme.colors.success
                  : theme.colors.textSecondary;

            return React.createElement(
              View,
              {
                key: question.id,
                onLayout: function (event) {
                  questionYMapRef.current[question.id] =
                    event.nativeEvent.layout.y;
                },
                style: [
                  styles.fullQuestionCard,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ],
              },
              React.createElement(
                View,
                { style: styles.fullQuestionHeader },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.fullQuestionTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Question " + (index + 1),
                ),
                React.createElement(
                  View,
                  {
                    style: [
                      styles.statusBadge,
                      {
                        backgroundColor:
                          selectedAnswer === "SKIPPED"
                            ? theme.colors.warning
                            : selectedAnswer
                              ? theme.colors.success
                              : theme.colors.card,
                      },
                    ],
                  },
                  React.createElement(
                    Text,
                    {
                      style: [
                        styles.statusBadgeText,
                        {
                          color:
                            selectedAnswer === "SKIPPED" || selectedAnswer
                              ? "#FFFFFF"
                              : theme.colors.textSecondary,
                        },
                      ],
                    },
                    statusText,
                  ),
                ),
              ),
              React.createElement(
                TouchableOpacity,
                {
                  activeOpacity: 0.9,
                  onPress: function () {
                    setZoomedImage({
                      uri: question.imageUri,
                      cropMeta: question.cropMeta,
                      imageWidth: question.imageWidth,
                      imageHeight: question.imageHeight,
                      title: "Question " + (index + 1),
                    });
                  },
                },
                React.createElement(CroppedImageView, {
                  uri: question.imageUri,
                  cropMeta: question.cropMeta,
                  imageWidth: question.imageWidth,
                  imageHeight: question.imageHeight,
                  width: 320,
                  borderRadius: 14,
                }),
              ),
              React.createElement(
                Text,
                {
                  style: [
                    styles.zoomHintText,
                    { color: theme.colors.textSecondary },
                  ],
                },
                "Tap the question image to zoom",
              ),
              question.questionText && question.questionText.trim()
                ? React.createElement(
                    Text,
                    {
                      style: [
                        styles.questionTextBlock,
                        {
                          color: theme.colors.textPrimary,
                          backgroundColor: theme.colors.card,
                        },
                      ],
                    },
                    question.questionText,
                  )
                : null,
              React.createElement(
                Text,
                {
                  style: [
                    styles.answerPrompt,
                    { color: theme.colors.textPrimary },
                  ],
                },
                "Choose your answer",
              ),
              renderOptionButton(question, "A"),
              renderOptionButton(question, "B"),
              renderOptionButton(question, "C"),
              renderOptionButton(question, "D"),
              React.createElement(
                View,
                { style: styles.questionActionRow },
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.questionActionButton,
                      { backgroundColor: theme.colors.warning },
                    ],
                    onPress: function () {
                      skipQuestion(question.id);
                    },
                  },
                  React.createElement(MaterialIcons, {
                    name: "skip-next",
                    size: 18,
                    color: "#FFFFFF",
                  }),
                  React.createElement(
                    Text,
                    { style: styles.questionActionButtonText },
                    "Skip",
                  ),
                ),
                React.createElement(
                  TouchableOpacity,
                  {
                    style: [
                      styles.questionActionButton,
                      { backgroundColor: theme.colors.textSecondary },
                    ],
                    onPress: function () {
                      clearQuestionAnswer(question.id);
                    },
                  },
                  React.createElement(MaterialIcons, {
                    name: "restart-alt",
                    size: 18,
                    color: "#FFFFFF",
                  }),
                  React.createElement(
                    Text,
                    { style: styles.questionActionButtonText },
                    "Clear",
                  ),
                ),
              ),
              React.createElement(
                Text,
                {
                  style: [styles.inlineStatusText, { color: statusColor }],
                },
                statusText,
              ),
            );
          }),
        ),
        React.createElement(
          View,
          {
            style: [
              styles.bottomNavBar,
              {
                backgroundColor: theme.colors.card,
                borderTopColor: theme.colors.border,
                paddingBottom: 12 + (insets.bottom || 0),
              },
            ],
          },
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.smallNavButton,
                { backgroundColor: theme.colors.primary },
              ],
              onPress: function () {
                setCurrentView("review");
              },
            },
            React.createElement(MaterialIcons, {
              name: "fact-check",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.smallNavButtonText },
              "Review",
            ),
          ),
        ),
        React.createElement(QuestionZoomModal, {
          visible: !!zoomedImage,
          image: zoomedImage,
          title: zoomedImage ? zoomedImage.title : "Question Preview",
          onClose: function () {
            setZoomedImage(null);
          },
          theme: theme,
          insetsTop: insets.top,
          insetsBottom: insets.bottom,
          screenWidth: 360,
        }),
      );
    };

    const renderReviewPage = function () {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(AppHeader, {
          theme: theme,
          topInset: insets.top,
          title: props.practiceMode ? "Review Practice" : "Review Answers",
          showBack: true,
          onBack: function () {
            setCurrentView("quiz");
          },
          showNext: false,
        }),
        React.createElement(
          ScrollView,
          {
            style: { flex: 1 },
            nestedScrollEnabled: true,
            keyboardShouldPersistTaps: "handled",
            contentContainerStyle: {
              padding: 20,
              paddingBottom: 100 + (insets.bottom || 0),
            },
          },
          React.createElement(
            View,
            {
              style: [
                styles.reviewSummaryCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ],
            },
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionTitle,
                  {
                    color: theme.colors.textPrimary,
                    marginBottom: 8,
                    fontSize: 22,
                  },
                ],
              },
              props.quiz.title +
                (props.practiceMode
                  ? " (Practice Wrong/Skipped)"
                  : props.shuffleMode
                    ? " (Shuffled)"
                    : ""),
            ),
            React.createElement(
              Text,
              {
                style: [
                  styles.sectionDescription,
                  { color: theme.colors.textSecondary, marginBottom: 0 },
                ],
              },
              "Answered: " +
                getAnsweredCount() +
                "   |   Skipped: " +
                getSkippedCount() +
                "   |   Pending: " +
                getPendingCount() +
                "   |   Total: " +
                questions.length,
            ),
          ),
          questions.map(function (question, index) {
            const answer = studentAnswers[question.id];
            const statusText = getAnswerStatus(question);
            const answerColor =
              answer === "SKIPPED"
                ? theme.colors.warning
                : answer
                  ? theme.colors.success
                  : theme.colors.textSecondary;

            return React.createElement(
              TouchableOpacity,
              {
                key: question.id,
                style: [
                  styles.reviewQuestionCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ],
                onPress: function () {
                  goToQuizQuestion(question.id);
                },
              },
              React.createElement(
                TouchableOpacity,
                {
                  activeOpacity: 0.9,
                  onPress: function () {
                    setZoomedImage({
                      uri: question.imageUri,
                      cropMeta: question.cropMeta,
                      imageWidth: question.imageWidth,
                      imageHeight: question.imageHeight,
                      title: "Question " + (index + 1),
                    });
                  },
                },
                React.createElement(CroppedImageView, {
                  uri: question.imageUri,
                  cropMeta: question.cropMeta,
                  imageWidth: question.imageWidth,
                  imageHeight: question.imageHeight,
                  width: 72,
                  borderRadius: 10,
                }),
              ),
              React.createElement(
                View,
                { style: { flex: 1, marginLeft: 12 } },
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.reviewQuestionTitle,
                      { color: theme.colors.textPrimary },
                    ],
                  },
                  "Question " + (index + 1),
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.reviewQuestionStatus,
                      { color: answerColor },
                    ],
                  },
                  statusText,
                ),
                React.createElement(
                  Text,
                  {
                    style: [
                      styles.reviewQuestionHint,
                      { color: theme.colors.textSecondary },
                    ],
                  },
                  "Tap to go back and change answer",
                ),
              ),
              React.createElement(MaterialIcons, {
                name: "chevron-right",
                size: 24,
                color: theme.colors.textSecondary,
              }),
            );
          }),
          React.createElement(
            TouchableOpacity,
            {
              style: [
                styles.primaryButton,
                { backgroundColor: theme.colors.primary, marginTop: 16 },
              ],
              onPress: function () {
                finishQuiz(studentAnswers);
              },
            },
            React.createElement(MaterialIcons, {
              name: "check-circle",
              size: 20,
              color: "#FFFFFF",
            }),
            React.createElement(
              Text,
              { style: styles.primaryButtonText },
              props.practiceMode ? "Finish Practice" : "Finish Quiz",
            ),
          ),
          React.createElement(QuestionZoomModal, {
            visible: !!zoomedImage,
            image: zoomedImage,
            title: zoomedImage ? zoomedImage.title : "Question Preview",
            onClose: function () {
              setZoomedImage(null);
            },
            theme: theme,
            insetsTop: insets.top,
            insetsBottom: insets.bottom,
            screenWidth: 360,
          }),
        ),
      );
    };

    return currentView === "review" ? renderReviewPage() : renderQuizPage();
  };

  const App = function () {
    const themeContext = useTheme();
    const theme = themeContext.theme;

    const [currentScreen, setCurrentScreen] = useState("home");
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [quizLaunch, setQuizLaunch] = useState({
      shuffleMode: false,
      practiceMode: false,
    });
    const [historyRefreshToken, setHistoryRefreshToken] = useState(0);
    const [selectedProgressFolderId, setSelectedProgressFolderId] =
      useState(null);

    if (currentScreen === "home") {
      return React.createElement(
        View,
        { style: { flex: 1, backgroundColor: theme.colors.background } },
        React.createElement(StatusBar, { barStyle: "dark-content" }),
        React.createElement(HomeScreen, {
          theme: theme,
          onCreateQuiz: function () {
            setCurrentScreen("create");
          },
          onMyQuiz: function () {
            setCurrentScreen("myQuiz");
          },
          onOpenQuiz: function (quiz, shuffleMode, practiceMode) {
            setSelectedQuiz(quiz);
            setQuizLaunch({
              shuffleMode: !!shuffleMode,
              practiceMode: !!practiceMode,
            });
            setCurrentScreen("takeQuiz");
          },
          onTabSelect: function (screenName) {
            setCurrentScreen(screenName);
          },
        }),
      );
    }

    if (currentScreen === "aiPlan") {
      return React.createElement(AIPlanScreen, {
        onOpenProgress: function () {
          setCurrentScreen("progress");
        },
        onOpenQuizzes: function () {
          setCurrentScreen("myQuiz");
        },
        onTabSelect: function (screenName) {
          setCurrentScreen(screenName);
        },
      });
    }

    if (currentScreen === "progress") {
      return React.createElement(ProgressScreen, {
        refreshToken: historyRefreshToken,
        onOpenQuizzes: function () {
          setCurrentScreen("myQuiz");
        },
        onOpenSubject: function (folderId) {
          setSelectedProgressFolderId(folderId);
          setCurrentScreen("progressDetail");
        },
        onCreateAIPlan: function () {
          setCurrentScreen("aiPlan");
        },
        onTabSelect: function (screenName) {
          setCurrentScreen(screenName);
        },
      });
    }

    if (currentScreen === "progressDetail") {
      return React.createElement(ProgressSubjectDetailScreen, {
        folderId: selectedProgressFolderId,
        onBack: function () {
          setCurrentScreen("progress");
        },
      });
    }

    if (currentScreen === "wellbeing") {
      return React.createElement(WellbeingScreen, {
        onTabSelect: function (screenName) {
          setCurrentScreen(screenName);
        },
      });
    }

    if (currentScreen === "explore") {
      return React.createElement(ExploreScreen, {
        onOpenExplorePage: function (screenName) {
          setCurrentScreen(screenName);
        },
        onTabSelect: function (screenName) {
          setCurrentScreen(screenName);
        },
      });
    }

    if (currentScreen === "exploreExtraCurricular") {
      return React.createElement(ExtracurricularScreen, {
        onBack: function () {
          setCurrentScreen("explore");
        },
      });
    }

    if (currentScreen === "exploreClassroom") {
      return React.createElement(ExploreBlankPage, {
        title: "Classroom",
        onBack: function () {
          setCurrentScreen("explore");
        },
      });
    }

    if (currentScreen === "exploreChat") {
      return React.createElement(ExploreBlankPage, {
        title: "Chat",
        onBack: function () {
          setCurrentScreen("explore");
        },
      });
    }

    if (currentScreen === "exploreAskAiHelp") {
      return React.createElement(AskAITutorScreen, {
        onBack: function () {
          setCurrentScreen("explore");
        },
      });
    }

    if (currentScreen === "create") {
      return React.createElement(CreateQuizScreen, {
        onBack: function () {
          setCurrentScreen("home");
        },
        onSavedGoMyQuiz: function (savedQuiz) {
          if (savedQuiz) {
            setSelectedQuiz(savedQuiz);
          }
          setHistoryRefreshToken(function (prev) {
            return prev + 1;
          });
          setCurrentScreen("myQuiz");
        },
      });
    }

    if (currentScreen === "myQuiz") {
      return React.createElement(MyQuizScreen, {
        refreshToken: historyRefreshToken,
        onBack: function () {
          setCurrentScreen("home");
        },
        onCreateQuiz: function () {
          setCurrentScreen("create");
        },
        onTabSelect: function (screenName) {
          setCurrentScreen(screenName);
        },
        onOpenQuiz: function (quiz, shuffleMode, practiceMode) {
          setSelectedQuiz(quiz);
          setQuizLaunch({
            shuffleMode: !!shuffleMode,
            practiceMode: !!practiceMode,
          });
          setCurrentScreen("takeQuiz");
        },
      });
    }

    if (currentScreen === "takeQuiz" && selectedQuiz) {
      return React.createElement(TakeQuizScreen, {
        quiz: selectedQuiz,
        shuffleMode: !!quizLaunch.shuffleMode,
        practiceMode: !!quizLaunch.practiceMode,
        onBack: function () {
          setCurrentScreen("myQuiz");
        },
        onDone: function () {
          setCurrentScreen("myQuiz");
        },
        onAttemptSaved: function () {
          setHistoryRefreshToken(function (prev) {
            return prev + 1;
          });
        },
      });
    }

    return React.createElement(
      View,
      { style: { flex: 1, justifyContent: "center", alignItems: "center" } },
      React.createElement(Text, null, "App screen error"),
    );
  };

  const styles = StyleSheet.create({
    wellbeingHeaderBlock: {
      marginBottom: 18,
    },
    wellbeingLargeTitle: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: "900",
      letterSpacing: -0.6,
      marginBottom: 8,
    },
    wellbeingSubtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
    },
    wellbeingCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#0B1229",
      shadowOpacity: 0.06,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    wellbeingCardTopRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    wellbeingIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    wellbeingCardTitle: {
      fontSize: 19,
      lineHeight: 24,
      fontWeight: "900",
    },
    wellbeingSmallText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
    },
    wellbeingMoodGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -5,
      marginBottom: -8,
    },
    wellbeingMoodButton: {
      borderWidth: 1,
      borderRadius: 18,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginHorizontal: 5,
      marginBottom: 10,
      minWidth: "46%",
      alignItems: "center",
    },
    wellbeingMoodText: {
      fontSize: 14,
      fontWeight: "900",
    },
    wellbeingQuickButton: {
      borderWidth: 1,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    wellbeingQuickButtonText: {
      fontSize: 15,
      fontWeight: "900",
      flex: 1,
      paddingRight: 10,
    },
    wellbeingChatHeaderRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 14,
    },
    wellbeingClearButton: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    wellbeingClearButtonText: {
      fontSize: 12,
      fontWeight: "900",
    },
    wellbeingChatList: {
      marginBottom: 12,
    },
    wellbeingBubble: {
      borderWidth: 1,
      borderRadius: 18,
      paddingVertical: 11,
      paddingHorizontal: 13,
      marginBottom: 10,
      maxWidth: "92%",
    },
    wellbeingAiBubble: {
      alignSelf: "flex-start",
      borderTopLeftRadius: 8,
    },
    wellbeingUserBubble: {
      alignSelf: "flex-end",
      borderTopRightRadius: 8,
    },
    wellbeingBubbleText: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
    },
    wellbeingInputRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 4,
    },
    wellbeingChatInput: {
      flex: 1,
      minHeight: 48,
      maxHeight: 110,
      borderWidth: 1,
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 11,
      fontSize: 14,
      fontWeight: "600",
      marginRight: 10,
    },
    wellbeingSendButton: {
      minHeight: 48,
      borderRadius: 18,
      paddingHorizontal: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    wellbeingSendButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "900",
    },
    wellbeingNoticeCard: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 14,
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 2,
    },
    wellbeingNoticeText: {
      flex: 1,
      marginLeft: 10,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "700",
    },

    plannerHeaderBlock: {
      marginBottom: 18,
    },
    plannerStepLabel: {
      fontSize: 13,
      fontWeight: "800",
      marginBottom: 8,
      letterSpacing: 0.3,
    },
    plannerSubjectCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      borderWidth: 1,
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
    },
    plannerSubjectTitle: {
      fontSize: 17,
      fontWeight: "900",
      marginBottom: 4,
    },
    plannerSubjectMeta: {
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 3,
    },
    plannerSubjectZone: {
      fontSize: 13,
      fontWeight: "900",
      marginBottom: 3,
    },
    plannerDateCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
    },
    plannerSmallButtonRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 12,
      gap: 8,
    },
    plannerSmallButton: {
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginRight: 8,
      marginBottom: 8,
    },
    plannerSmallButtonText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
    plannerDayCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 16,
      marginBottom: 14,
    },
    plannerDayGroup: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 12,
      marginBottom: 12,
    },
    plannerDayHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    plannerDayTitle: {
      fontSize: 18,
      fontWeight: "900",
    },
    plannerClearText: {
      fontSize: 13,
      fontWeight: "800",
    },
    plannerEmptyText: {
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 8,
    },
    plannerSlotCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 13,
      marginBottom: 12,
    },
    plannerSlotTitle: {
      fontSize: 15,
      fontWeight: "900",
      marginBottom: 10,
    },
    plannerTimeRow: {
      flexDirection: "row",
      gap: 10,
    },
    plannerTimeButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 16,
      padding: 12,
      marginBottom: 10,
    },
    plannerTimeLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 3,
    },
    plannerTimeValue: {
      fontSize: 16,
      fontWeight: "900",
    },
    plannerRemoveSlotButton: {
      borderWidth: 1,
      borderRadius: 999,
      paddingVertical: 9,
      alignItems: "center",
    },
    plannerRemoveSlotText: {
      fontSize: 13,
      fontWeight: "800",
    },
    plannerQuestionText: {
      fontSize: 17,
      fontWeight: "900",
      marginBottom: 12,
    },
    plannerOptionGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    plannerNumberOption: {
      width: 52,
      height: 52,
      borderRadius: 18,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
      marginBottom: 8,
    },
    plannerNumberOptionText: {
      fontSize: 18,
      fontWeight: "900",
    },
    plannerModeRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 10,
    },
    plannerModeButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 18,
      paddingVertical: 13,
      alignItems: "center",
    },
    plannerModeButtonText: {
      fontSize: 14,
      fontWeight: "900",
    },
    plannerDayChip: {
      borderWidth: 1,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
    },
    plannerDayChipText: {
      fontSize: 12,
      fontWeight: "800",
    },
    plannerHelperText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      marginTop: 10,
    },
    plannerSummaryCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 16,
      marginBottom: 14,
    },
    plannerScheduleCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
    },
    plannerScheduleTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    plannerScheduleTime: {
      fontSize: 13,
      fontWeight: "900",
    },
    plannerStatusBadge: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    plannerStatusBadgeText: {
      fontSize: 11,
      fontWeight: "900",
    },
    plannerScheduleSubject: {
      fontSize: 17,
      fontWeight: "900",
      marginBottom: 3,
    },
    plannerScheduleTask: {
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 4,
    },
    plannerScheduleReason: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "600",
    },
    plannerDoneButton: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    plannerDoneButtonText: {
      fontSize: 13,
      fontWeight: "900",
    },
    plannerBottomBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderTopWidth: 1,
      paddingHorizontal: 16,
      paddingTop: 12,
      flexDirection: "row",
      gap: 10,
      zIndex: 40,
      elevation: 40,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: -3 },
      shadowRadius: 12,
    },
    plannerBottomButton: {
      borderWidth: 1,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    plannerBottomButtonText: {
      fontSize: 15,
      fontWeight: "900",
    },
    plannerWheelChip: {
      minWidth: 54,
      borderWidth: 1,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: "center",
      marginRight: 8,
    },
    plannerWheelChipText: {
      fontSize: 16,
      fontWeight: "900",
    },
    plannerPickerPreview: {
      fontSize: 34,
      fontWeight: "900",
      textAlign: "center",
      marginVertical: 14,
    },
    plannerMeridiemRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 4,
    },
    plannerMeridiemButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
    plannerMeridiemText: {
      fontSize: 15,
      fontWeight: "900",
    },
    plannerTodayCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 16,
      marginTop: 8,
    },
    plannerTodayTitle: {
      fontSize: 20,
      fontWeight: "900",
      marginBottom: 12,
    },
    plannerMiniEmptyBox: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
    },
    plannerPreviewLabel: {
      fontSize: 13,
      fontWeight: "900",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.4,
    },
    quickCreateFab: {
      position: "absolute",
      width: 62,
      height: 62,
      borderRadius: 31,
      alignItems: "center",
      justifyContent: "center",
      elevation: 8,
      shadowColor: "#000000",
      shadowOpacity: 0.18,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      zIndex: 30,
    },
    quickCreateMenuCard: {
      width: 220,
      borderWidth: 1,
      borderRadius: 18,
      overflow: "hidden",
      marginLeft: 8,
    },
    quickCreateMenuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    quickCreateMenuItemText: {
      fontSize: 16,
      fontWeight: "800",
      marginLeft: 12,
    },
    actionSheetCard: {
      width: "92%",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: 24,
      padding: 16,
      shadowColor: "#000000",
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 12,
    },
    actionSheetTitle: { fontSize: 22, fontWeight: "900", marginBottom: 4 },
    actionSheetSubtitle: { fontSize: 13, fontWeight: "600", marginBottom: 10 },
    actionSheetRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
    },
    actionSheetRowText: { fontSize: 16, fontWeight: "800", marginLeft: 12 },
    actionSheetCancelButton: {
      height: 52,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 14,
    },
    actionSheetCancelText: { fontSize: 16, fontWeight: "900" },
    searchInput: {
      height: 52,
      borderRadius: 18,
      borderWidth: 1,
      paddingHorizontal: 16,
      fontSize: 15,
      fontWeight: "600",
    },
    outlineHomeButton: {
      minHeight: 52,
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
      paddingHorizontal: 16,
    },
    outlineHomeButtonText: {
      fontSize: 16,
      fontWeight: "900",
      marginLeft: 8,
    },
    homeSearchCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 14,
      marginTop: 16,
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    homeSearchInputWrap: {
      minHeight: 52,
      borderRadius: 17,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
    },
    homeSearchInput: {
      flex: 1,
      minHeight: 48,
      paddingHorizontal: 10,
      fontSize: 15,
      fontWeight: "700",
    },
    homeSearchClearButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    homeSearchHint: {
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "700",
      marginTop: 10,
      paddingHorizontal: 2,
    },
    homeSearchResultsWrap: {
      marginTop: 12,
    },
    homeSearchResultItem: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 12,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    homeSearchResultIcon: {
      width: 38,
      height: 38,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    homeSearchResultTitle: {
      fontSize: 14,
      fontWeight: "900",
      marginBottom: 2,
    },
    homeSearchResultMeta: {
      fontSize: 12,
      fontWeight: "700",
    },
    homeSearchEmptyBox: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    homeSearchEmptyText: {
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
    homeInfoCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 18,
      marginTop: 16,
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    homeCardTitle: {
      fontSize: 18,
      fontWeight: "900",
      marginBottom: 6,
    },
    homeCardText: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
    },
    homeStatsRow: {
      flexDirection: "row",
      marginTop: 8,
    },
    homeStatBox: {
      flex: 1,
      paddingRight: 8,
    },
    homeStatNumber: {
      fontSize: 22,
      fontWeight: "900",
      marginBottom: 2,
    },
    homeStatLabel: {
      fontSize: 12,
      fontWeight: "700",
    },
    appHeader: { borderBottomWidth: 1 },
    appHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    appHeaderTitle: {
      fontSize: 18,
      fontWeight: "700",
      flex: 1,
      textAlign: "center",
    },
    headerIconButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    dismissButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
    },
    heroCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 24,
      marginTop: 30,
    },
    heroTitle: {
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 10,
    },
    heroSubtitle: {
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 24,
    },
    bigActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 14,
    },
    bigActionButtonText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "700",
      marginLeft: 8,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "800",
      marginBottom: 12,
    },
    sectionDescription: {
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 18,
    },
    titleInput: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      marginBottom: 20,
    },
    uploadBox: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
    },
    uploadBoxTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginTop: 14,
      marginBottom: 8,
    },
    uploadBoxDescription: {
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 18,
    },
    primaryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      borderRadius: 12,
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 8,
    },
    previewTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 10,
    },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    imageGridItem: {
      width: "31%",
      marginBottom: 12,
      position: "relative",
    },
    cropThumbLabel: {
      position: "absolute",
      left: 4,
      bottom: 4,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 999,
    },
    uploadedImageCard: {
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(15, 23, 42, 0.45)",
      paddingHorizontal: 20,
    },
    modalCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 20,
    },
    answerModalCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 20,
      maxHeight: "88%",
    },
    modalTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "800",
      flex: 1,
    },
    modalDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
      marginBottom: 18,
    },
    modalPrimaryButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 12,
    },
    modalPrimaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 8,
    },
    modalSecondaryButton: {
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    modalSecondaryButtonText: {
      fontSize: 16,
      fontWeight: "700",
    },
    answerChooserLabel: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 10,
    },
    answerChoiceButton: {
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginBottom: 10,
    },
    answerChoiceButtonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    ocrInput: {
      borderWidth: 1,
      borderRadius: 12,
      minHeight: 100,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      textAlignVertical: "top",
    },
    emptyStateWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    emptyStateTitle: {
      fontSize: 22,
      fontWeight: "800",
      marginTop: 14,
      marginBottom: 8,
    },
    reviewEditCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 12,
      marginBottom: 14,
    },
    reviewEditTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    reviewEditTitle: {
      fontSize: 16,
      fontWeight: "800",
    },
    reviewEditBody: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    reorderButton: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    questionMetaSmall: {
      fontSize: 13,
      lineHeight: 18,
      marginBottom: 4,
    },
    quizListCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
    },
    quizListTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    quizListTitle: {
      fontSize: 18,
      fontWeight: "800",
      flex: 1,
      marginRight: 8,
    },
    quizCountBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },
    quizCountBadgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    quizMetaText: {
      fontSize: 13,
      lineHeight: 18,
    },
    quizActionButtonsRowWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 14,
    },
    actionMiniButtonWrap: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginRight: 10,
      marginBottom: 10,
    },
    actionMiniButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },

    aiTutorHeroCard: {
      borderWidth: 0,
      borderRadius: 28,
      padding: 20,
      marginBottom: 18,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 7,
    },
    aiTutorHeroIcon: {
      width: 58,
      height: 58,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    aiTutorHeroTitle: {
      fontSize: 28,
      fontWeight: "900",
      letterSpacing: -0.4,
      marginBottom: 6,
    },
    aiTutorHeroText: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
      marginBottom: 8,
    },
    aiTutorHelperText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
      marginBottom: 14,
    },
    aiTutorSubjectScroll: {
      paddingVertical: 4,
      paddingRight: 8,
      marginBottom: 10,
    },
    aiTutorSubjectChip: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginRight: 8,
    },
    aiTutorSubjectChipText: { fontSize: 13, fontWeight: "800" },
    aiTutorInputCard: {
      borderWidth: 1,
      borderRadius: 22,
      paddingHorizontal: 14,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      minHeight: 58,
    },
    aiTutorTopInput: {
      flex: 1,
      fontSize: 15,
      lineHeight: 21,
      fontWeight: "700",
      paddingHorizontal: 8,
      paddingTop: 0,
      minHeight: 40,
      maxHeight: 120,
    },
    aiTutorActionRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 12,
      marginHorizontal: -4,
    },
    aiTutorActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 11,
      margin: 4,
    },
    aiTutorActionButtonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "900",
      marginLeft: 5,
    },
    aiTutorAskButton: {
      marginTop: 10,
      borderRadius: 18,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    aiTutorAskButtonText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "900",
      marginLeft: 8,
    },
    aiTutorActiveChatCard: {
      borderWidth: 0,
      borderRadius: 28,
      padding: 16,
      marginBottom: 18,
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
    },
    aiTutorActiveHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    aiTutorActiveMeta: { fontSize: 12, fontWeight: "800", marginLeft: 8 },
    aiTutorMessageBubble: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 13,
      marginVertical: 6,
      maxWidth: "92%",
    },
    aiTutorUserBubble: { alignSelf: "flex-end", borderTopRightRadius: 8 },
    aiTutorAiBubble: { alignSelf: "flex-start", borderTopLeftRadius: 8 },
    aiTutorMessageText: { fontSize: 15, lineHeight: 22, fontWeight: "650" },
    aiTutorMessageTime: { fontSize: 10, fontWeight: "700", marginTop: 8 },
    aiTutorMessageImage: {
      width: 210,
      height: 145,
      borderRadius: 16,
      marginBottom: 10,
      backgroundColor: "#E5E7EB",
    },
    aiTutorEmptyCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 18,
      marginBottom: 18,
    },
    aiTutorEmptyTitle: {
      fontSize: 18,
      fontWeight: "900",
      marginTop: 8,
      marginBottom: 4,
    },
    aiTutorEmptyText: { fontSize: 14, lineHeight: 21, fontWeight: "600" },
    aiTutorSectionTitle: {
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.2,
      marginBottom: 10,
    },
    aiTutorChatRow: {
      borderWidth: 0,
      borderRadius: 24,
      padding: 14,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#0B1229",
      shadowOpacity: 0.06,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },
    aiTutorChatIcon: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    aiTutorChatTitle: { fontSize: 16, fontWeight: "900", marginBottom: 3 },
    aiTutorChatPreview: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
      marginBottom: 4,
    },
    aiTutorChatDate: { fontSize: 11, fontWeight: "800" },
    aiTutorThreeDotButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    aiTutorMenuCard: {
      width: 220,
      borderRadius: 22,
      paddingVertical: 8,
      alignSelf: "center",
      marginTop: 180,
      shadowColor: "#000000",
      shadowOpacity: 0.14,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 10,
    },
    aiTutorMenuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      paddingVertical: 14,
    },
    aiTutorMenuText: { fontSize: 16, fontWeight: "800", marginLeft: 10 },
    aiTutorModalCard: {
      width: "86%",
      alignSelf: "center",
      borderRadius: 26,
      padding: 20,
      shadowColor: "#000000",
      shadowOpacity: 0.16,
      shadowRadius: 26,
      shadowOffset: { width: 0, height: 12 },
      elevation: 12,
    },
    aiTutorModalTitle: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
    aiTutorModalMessage: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
      marginBottom: 14,
    },
    aiTutorRenameInput: {
      borderWidth: 1,
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 16,
    },
    aiTutorModalButtonRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginHorizontal: -4,
    },
    aiTutorModalButton: {
      borderRadius: 999,
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginHorizontal: 4,
    },
    aiTutorModalButtonText: { fontSize: 14, fontWeight: "900" },
    aiTutorEmptyHistory: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 18,
      marginBottom: 14,
    },
    aiTutorSavingText: {
      textAlign: "center",
      fontSize: 12,
      fontWeight: "800",
      marginTop: 4,
    },
    resultsCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 24,
      alignItems: "center",
      marginBottom: 20,
    },
    resultsBigTitle: {
      fontSize: 28,
      fontWeight: "800",
      marginTop: 10,
    },
    resultsScoreText: {
      fontSize: 50,
      fontWeight: "900",
      marginVertical: 8,
    },
    resultsBreakdownCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    resultsBreakdownTitle: {
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 12,
    },
    resultsBreakdownRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    resultsBreakdownBox: {
      width: "31%",
      borderWidth: 1.5,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    resultsBreakdownNumber: {
      fontSize: 28,
      fontWeight: "900",
      marginBottom: 6,
    },
    resultsBreakdownLabel: {
      fontSize: 13,
      fontWeight: "700",
    },
    resultsQuestionCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 14,
      marginBottom: 14,
    },
    resultsQuestionTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    resultsQuestionTitle: {
      fontSize: 16,
      fontWeight: "800",
      flex: 1,
      marginRight: 8,
    },
    resultTypeBadge: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    resultTypeBadgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "800",
    },
    answerCompareRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
    },
    answerCompareBox: {
      width: "48.5%",
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    answerCompareLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 6,
    },
    answerCompareValue: {
      fontSize: 18,
      fontWeight: "900",
    },
    fullQuestionCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 16,
      marginBottom: 18,
    },
    fullQuestionTitle: {
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 12,
    },
    mcqButton: {
      borderWidth: 2,
      borderRadius: 14,
      padding: 16,
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    mcqCircle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    mcqCircleText: {
      fontSize: 15,
      fontWeight: "800",
    },
    mcqLabel: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
    },
    bottomNavBar: {
      borderTopWidth: 1,
      paddingHorizontal: 10,
      paddingTop: 12,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    smallNavButton: {
      minWidth: 100,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flex: 1,
      marginHorizontal: 4,
    },
    smallNavButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },
    cropStage: {
      width: "100%",
      minHeight: 420,
      height: 420,
      borderWidth: 1,
      borderRadius: 14,
      overflow: "hidden",
      marginBottom: 16,
    },
    aspectWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    aspectButton: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    cropActionRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    cropActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginRight: 10,
      marginBottom: 10,
    },
    cropActionButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },
    cropInfoCard: {
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
    },
    cropCornerHandle: {
      position: "absolute",
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      zIndex: 20,
      elevation: 6,
    },
    cropCornerHandleTopLeft: {
      left: -12,
      top: -12,
    },
    cropCornerHandleTopRight: {
      right: -12,
      top: -12,
    },
    cropCornerHandleBottomLeft: {
      left: -12,
      bottom: -12,
    },
    cropCornerHandleBottomRight: {
      right: -12,
      bottom: -12,
    },

    emptyStateText: {
      fontSize: 15,
      textAlign: "center",
      lineHeight: 22,
    },
    reviewSummaryCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    reviewQuestionCard: {
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    reviewQuestionTitle: {
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    reviewQuestionStatus: {
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 4,
    },
    reviewQuestionHint: {
      fontSize: 13,
    },
    fullQuestionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    statusBadge: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
      maxWidth: "48%",
    },
    statusBadgeText: {
      fontSize: 12,
      fontWeight: "700",
    },
    questionTextBlock: {
      fontSize: 14,
      lineHeight: 21,
      padding: 12,
      borderRadius: 12,
      marginBottom: 14,
    },
    answerPrompt: {
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 14,
    },
    questionActionRow: {
      flexDirection: "row",
      marginTop: 4,
    },
    questionActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginRight: 10,
    },
    questionActionButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },
    inlineStatusText: {
      marginTop: 10,
      fontSize: 13,
      fontWeight: "700",
    },
    zoomHintText: {
      marginTop: 8,
      marginBottom: 6,
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
    },
    zoomModalOverlay: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.72)",
      paddingHorizontal: 12,
      justifyContent: "center",
    },
    zoomModalCard: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
    },
    zoomModalHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 10,
    },
    zoomModalTitle: {
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 2,
    },
    zoomModalHint: {
      fontSize: 13,
      lineHeight: 18,
    },
    zoomModalScrollContent: {
      paddingHorizontal: 8,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
    },

    trialDropdownTrigger: {
      borderWidth: 1,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    trialDropdownLabel: {
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    trialDropdownMeta: {
      fontSize: 12,
      lineHeight: 16,
    },
    trialDropdownModalCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 16,
      maxHeight: "80%",
    },
    trialHistoryButton: {
      borderWidth: 1,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    trialHistoryTitle: {
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 4,
    },
    trialHistoryMeta: {
      fontSize: 12,
      lineHeight: 16,
    },
    trialHistoryScoreBadge: {
      minWidth: 70,
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    markSchemeRow: {
      borderWidth: 1,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    markSchemeRowTitle: {
      fontSize: 15,
      fontWeight: "800",
      marginRight: 12,
      minWidth: 42,
    },
    markSchemeAnswerButtons: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      flex: 1,
    },
    markSchemeAnswerButton: {
      minWidth: 38,
      height: 38,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
      marginBottom: 6,
      paddingHorizontal: 10,
    },
    markSchemeClearButton: {
      width: 38,
      height: 38,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
      marginBottom: 6,
    },
    trialHistoryScoreBadgeText: {
      fontSize: 13,
      fontWeight: "800",
    },

    countdownSectionCard: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 16,
      marginTop: 18,
    },
    countdownSectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    countdownSectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 4,
    },
    countdownSectionSubtitle: {
      fontSize: 13,
      lineHeight: 18,
    },
    countdownEmptyCard: {
      borderWidth: 1,
      borderRadius: 16,
      minHeight: 180,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    countdownEmptyText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      lineHeight: 22,
      marginTop: 12,
    },
    countdownGridWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 2,
    },
    countdownCard: {
      width: "48.3%",
      borderWidth: 1,
      borderRadius: 18,
      padding: 14,
      marginTop: 10,
      minHeight: 215,
    },
    countdownCardTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    countdownCardTitle: {
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    countdownCardDate: {
      fontSize: 12,
      fontWeight: "500",
    },
    countdownMenuTrigger: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginTop: -2,
      marginRight: -4,
    },
    simpleCountdownBody: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 6,
      paddingBottom: 8,
      flex: 1,
    },
    simpleCountdownStatus: {
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
      lineHeight: 18,
      minHeight: 36,
    },
    countdownMenuCard: {
      width: 180,
      borderWidth: 1,
      borderRadius: 10,
      alignSelf: "flex-end",
      marginTop: -140,
      marginRight: 22,
      overflow: "hidden",
    },
    countdownMenuItem: {
      paddingHorizontal: 18,
      paddingVertical: 18,
    },
    countdownMenuItemLast: {
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.08)",
    },
    countdownMenuItemText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
    },
    countdownFloatingButton: {
      position: "absolute",
      left: 22,
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      elevation: 8,
      shadowColor: "#000000",
      shadowOpacity: 0.22,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },

    countdownDateFieldButton: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 0,
    },
    countdownDateFieldLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 6,
    },
    countdownDateFieldValue: {
      fontSize: 18,
      fontWeight: "800",
    },
    countdownSelectedDateBanner: {
      borderWidth: 1,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    countdownSelectedDateText: {
      fontSize: 17,
      fontWeight: "800",
      marginLeft: 10,
    },
    countdownPickerSectionTitle: {
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 10,
    },
    countdownPickerChip: {
      minHeight: 42,
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    countdownPickerChipText: {
      fontSize: 14,
      fontWeight: "700",
    },
    countdownInputHint: {
      fontSize: 12,
      lineHeight: 18,
      marginTop: 8,
    },
    folderSelectorButton: {
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    folderSelectorLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 4,
    },
    folderSelectorValue: {
      fontSize: 16,
      fontWeight: "800",
    },
    folderPickerItem: {
      borderWidth: 1,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    folderPickerItemTitle: {
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    folderPickerItemMeta: {
      fontSize: 13,
      lineHeight: 18,
    },
    topTabsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    topTabButton: {
      width: "31.5%",
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    folderGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    folderCard: {
      width: "48%",
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    },
    folderCardIconWrap: {
      width: 54,
      height: 54,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    folderCardTitle: {
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 6,
    },
    folderCardMeta: {
      fontSize: 13,
      lineHeight: 18,
    },
    folderDetailHeaderCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    folderDetailTitle: {
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 6,
    },
    folderDetailMeta: {
      fontSize: 13,
      lineHeight: 18,
      marginBottom: 14,
    },
    sortToggleRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    sortToggleButton: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginRight: 10,
      marginBottom: 2,
    },
    quizMetaChipRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    folderNameChip: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
    },
    folderNameChipText: {
      fontSize: 12,
      fontWeight: "700",
      marginLeft: 6,
    },
    appleTabBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: 78,
      borderTopWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 8,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: -4 },
      shadowRadius: 18,
      elevation: 18,
    },
    appleTabItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 54,
    },
    appleTabLabel: {
      fontSize: 11,
      fontWeight: "700",
      marginTop: 3,
    },
    exploreHeaderBlock: {
      marginBottom: 18,
    },
    exploreLargeTitle: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: "900",
      letterSpacing: -0.6,
      marginBottom: 8,
    },
    exploreSubtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
    },
    exploreFileCard: {
      borderWidth: 1,
      borderRadius: 22,
      padding: 16,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    exploreFileIconWrap: {
      width: 52,
      height: 52,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    exploreFileTitle: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: "900",
      marginBottom: 4,
    },
    exploreFileDescription: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
    },
    exploreFileButtonText: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "900",
      marginTop: 8,
    },
    extracurricularIntroCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "flex-start",
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 7 },
      elevation: 2,
    },
    extracurricularIntroIcon: {
      width: 52,
      height: 52,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    extracurricularIntroTitle: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "900",
      marginBottom: 5,
    },
    extracurricularIntroText: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
    },
    extracurricularOpportunityCard: {
      borderWidth: 1,
      borderRadius: 28,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#0F172A",
      shadowOpacity: 0.07,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
      elevation: 3,
    },
    extracurricularOpportunityTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    extracurricularBadge: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    extracurricularBadgeText: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "900",
    },
    extracurricularOpportunityTitle: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "900",
      letterSpacing: -0.3,
      marginBottom: 8,
    },
    extracurricularOpportunityDescription: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
      marginBottom: 14,
    },
    extracurricularInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    extracurricularInfoText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
      marginLeft: 8,
    },
    extracurricularCardBottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
    },
    extracurricularSaveButton: {
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 13,
      paddingVertical: 11,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    extracurricularSaveText: {
      fontSize: 13,
      lineHeight: 17,
      fontWeight: "900",
      marginLeft: 5,
    },
    extracurricularTelegramButton: {
      flex: 1,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#0F172A",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    extracurricularTelegramButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      lineHeight: 18,
      fontWeight: "900",
      marginLeft: 6,
    },
    extracurricularFutureCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 16,
      marginBottom: 14,
    },
    extracurricularFutureHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    extracurricularFutureTitle: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "900",
      marginLeft: 8,
    },
    extracurricularFutureText: {
      fontSize: 13,
      lineHeight: 20,
      fontWeight: "600",
    },
    extracurricularSafetyNote: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 14,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    extracurricularSafetyText: {
      flex: 1,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "600",
      marginLeft: 8,
    },
    progressHeaderBlock: {
      marginBottom: 18,
    },
    progressLargeTitle: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: "900",
      letterSpacing: -0.6,
      marginBottom: 6,
    },
    progressSubtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
    },
    progressSectionTitle: {
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.2,
      marginBottom: 12,
    },
    progressEmptyCard: {
      borderWidth: 1,
      borderRadius: 28,
      padding: 22,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 260,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    progressEmptyTitle: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "900",
      textAlign: "center",
      marginTop: 14,
    },
    progressEmptyText: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 8,
    },
    progressOverallCard: {
      borderWidth: 1,
      borderRadius: 28,
      padding: 18,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    progressOverallHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    progressOverallTitle: {
      color: "#FFFFFF",
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "900",
    },
    progressOverallSubtitle: {
      color: "rgba(255,255,255,0.76)",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "700",
      marginTop: 3,
    },
    progressOverallBadge: {
      minWidth: 74,
      height: 74,
      borderRadius: 37,
      backgroundColor: "rgba(255,255,255,0.16)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.24)",
    },
    progressOverallBadgeText: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "900",
    },
    progressOverallGrid: {
      flexDirection: "row",
      gap: 8,
    },
    progressOverallMiniBox: {
      flex: 1,
      borderRadius: 18,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.12)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.16)",
      minHeight: 76,
      justifyContent: "center",
    },
    progressOverallMiniValue: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "900",
      marginBottom: 4,
    },
    progressOverallMiniLabel: {
      color: "rgba(255,255,255,0.74)",
      fontSize: 11,
      lineHeight: 15,
      fontWeight: "700",
    },
    progressSubjectCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 16,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 2,
    },
    progressSubjectTopRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    progressSubjectIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    progressSubjectTitle: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "900",
    },
    progressSubjectReadiness: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "800",
      marginTop: 2,
    },
    progressMetricRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 7,
      gap: 12,
    },
    progressMetricLabel: {
      flex: 1,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "700",
    },
    progressMetricValue: {
      flex: 1,
      textAlign: "right",
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "900",
    },
    progressInfoCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 16,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 2,
    },
    progressInfoCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    progressIconWrap: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    progressInfoCardTitle: {
      flex: 1,
      fontSize: 17,
      lineHeight: 23,
      fontWeight: "900",
    },
    progressDetailBigNumber: {
      fontSize: 36,
      lineHeight: 42,
      fontWeight: "900",
      letterSpacing: -0.5,
      marginBottom: 4,
    },
    progressZoneText: {
      fontSize: 15,
      lineHeight: 21,
      fontWeight: "900",
      marginBottom: 6,
    },
    progressDetailMessage: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
    },
    progressRecommendationText: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "800",
    },
    blankExplorePageTitle: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: "900",
      letterSpacing: -0.6,
    },
    blankPageTitle: {
      fontSize: 48,
      lineHeight: 54,
      fontWeight: "900",
      letterSpacing: -1.2,
    },

    /* v59 Apple-inspired visual overrides */
    appHeader: {
      borderBottomWidth: 0,
      shadowColor: "#0B1229",
      shadowOpacity: 0,
      elevation: 0,
    },
    appHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingVertical: 16,
    },
    appHeaderTitle: {
      fontSize: 30,
      fontWeight: "900",
      flex: 1,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    headerIconButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F0EEFF",
    },
    heroCard: {
      borderWidth: 0,
      borderRadius: 28,
      padding: 26,
      marginTop: 42,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
    heroTitle: {
      fontSize: 48,
      lineHeight: 54,
      fontWeight: "900",
      marginBottom: 6,
      letterSpacing: -1.2,
    },
    heroSubtitle: {
      fontSize: 18,
      lineHeight: 25,
      marginBottom: 24,
      fontWeight: "500",
    },
    bigActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 18,
      marginBottom: 12,
      shadowColor: "#0B1229",
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: "900",
      marginBottom: 14,
      letterSpacing: -0.4,
    },
    titleInput: {
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 15,
      fontSize: 16,
      marginBottom: 18,
    },
    primaryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 16,
      marginTop: 12,
      shadowColor: "#0B1229",
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
    uploadBox: {
      borderWidth: 0,
      borderRadius: 24,
      padding: 26,
      alignItems: "center",
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
    },
    reviewSummaryCard: {
      borderWidth: 0,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
    },
    reviewEditCard: {
      borderWidth: 0,
      borderRadius: 22,
      padding: 14,
      marginBottom: 14,
      shadowColor: "#0B1229",
      shadowOpacity: 0.06,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    fullQuestionCard: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 18,
      marginBottom: 20,
      shadowColor: "#0B1229",
      shadowOpacity: 0.05,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    mcqButton: {
      borderWidth: 1.4,
      borderRadius: 20,
      padding: 18,
      marginTop: 14,
      flexDirection: "row",
      alignItems: "center",
    },
    bottomNavBar: {
      borderTopWidth: 1,
      paddingHorizontal: 20,
      paddingTop: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: -4 },
      shadowRadius: 18,
      elevation: 18,
    },
    smallNavButton: {
      minWidth: 100,
      borderRadius: 18,
      paddingVertical: 16,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flex: 1,
      marginHorizontal: 4,
    },
    cropStage: {
      width: "100%",
      minHeight: 470,
      height: 470,
      borderWidth: 0,
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 16,
      shadowColor: "#0B1229",
      shadowOpacity: 0.1,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 8,
    },
    aspectButton: {
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginRight: 10,
      marginBottom: 10,
    },
    countdownSectionCard: {
      borderWidth: 0,
      borderRadius: 28,
      padding: 18,
      marginTop: 18,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 7,
    },
    countdownSectionTitle: {
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 4,
      letterSpacing: -0.3,
    },
    countdownCard: {
      width: "100%",
      borderWidth: 0,
      borderRadius: 26,
      padding: 18,
      marginTop: 12,
      minHeight: 235,
      shadowColor: "#0B1229",
      shadowOpacity: 0.12,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 8,
    },
    countdownCardTitle: {
      fontSize: 22,
      fontWeight: "900",
      marginBottom: 4,
    },
    simpleCountdownStatus: {
      fontSize: 16,
      fontWeight: "800",
      textAlign: "center",
      lineHeight: 22,
    },
    folderCard: {
      width: "48%",
      borderWidth: 0,
      borderRadius: 22,
      padding: 18,
      minHeight: 118,
      marginBottom: 14,
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },
    folderCardIconWrap: {
      width: 58,
      height: 58,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    quizListCard: {
      borderWidth: 0,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
    },
    resultsCard: {
      borderWidth: 0,
      borderRadius: 28,
      padding: 26,
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "#0B1229",
      shadowOpacity: 0.08,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 7,
    },
    resultsBreakdownCard: {
      borderWidth: 0,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#0B1229",
      shadowOpacity: 0.07,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
    },
  });

  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(
      View,
      { style: { flex: 1, width: "100%", height: "100%" } },
      React.createElement(LocalStorageGate, null, React.createElement(App)),
    ),
  );
};

export default ComponentFunction;
